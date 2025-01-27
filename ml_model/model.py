import pandas as pd
import numpy as np
import yfinance as yf
import datetime as dt
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential, load_model
from keras.layers import Dense, LSTM, Dropout
import joblib
import os
import json


# Function to load data
def load_data(company, start, end):
    return yf.download(company, start=start, end=end)

# Function to preprocess data
def preprocess_data(data, feature, prediction_days):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data[feature].values.reshape(-1, 1))
    
    x_train, y_train = [], []
    for x in range(prediction_days, len(scaled_data)):
        x_train.append(scaled_data[x - prediction_days:x, 0])
        y_train.append(scaled_data[x, 0])
    
    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
    
    return x_train, y_train, scaler

# Function to build the LSTM model
def build_model(input_shape):
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50))
    model.add(Dropout(0.2))
    model.add(Dense(units=1))
    
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# Function to prepare test data
def prepare_test_data(data, test_data, prediction_days, scaler):
    total_data = pd.concat((data['Close'], test_data['Close']), axis=0)
    model_inputs = total_data[len(total_data) - len(test_data) - prediction_days:].values
    model_inputs = model_inputs.reshape(-1, 1)
    model_inputs = scaler.transform(model_inputs)
    
    x_test = []
    for x in range(prediction_days, len(model_inputs)):
        x_test.append(model_inputs[x - prediction_days:x, 0])
    
    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
    return x_test, model_inputs

# Function to plot predictions
def plot_predictions(actual_prices, predicted_prices, company):
    plt.figure(figsize=(10, 6))
    plt.plot(actual_prices, color='black', label=f"Actual {company} Price")
    plt.plot(predicted_prices, color='green', label=f"Predicted {company} Price")
    plt.title(f"{company} Share Price Prediction")
    plt.xlabel('Time')
    plt.ylabel(f'{company} Share Price')
    plt.legend()
    plt.show()

# Function to save the model and scaler
def save_model_and_scaler(model, scaler, model_path, scaler_path):
    # Save the model
    model.save(model_path)
    print(f"Model saved to {model_path}")
    
    # Save the scaler
    joblib.dump(scaler, scaler_path)
    print(f"Scaler saved to {scaler_path}")

def predict_next_day_price(model, last_data, scaler):
    # Ensure `last_data` has the shape (1, prediction_days, 1)
    last_data = np.array(last_data).reshape(1, -1, 1)
    next_day_scaled = model.predict(last_data)
    next_day_price = scaler.inverse_transform(next_day_scaled)
    return next_day_price[0, 0]  # Return the single predicted price

# Save predicted price and date to a JSON file
def save_prediction_to_file(next_date, next_day_price, file_path="predicted_price.json"):
    prediction_data = {
        "date": next_date.strftime('%Y-%m-%d'),
        "predicted_price": float(round(next_day_price, 2))  # Ensure float compatibility
    }
    try:
        with open(file_path, 'w') as f:
            json.dump(prediction_data, f)
        print(f"Prediction saved to {file_path}")
    except Exception as e:
        print(f"Error saving prediction: {e}")



# Main script
if __name__ == "__main__":
    company = 'TSLA'
    start = dt.datetime(2014, 1, 1)
    end = dt.datetime(2024, 1, 1)
    prediction_days = 60
    
    # Paths for saving the model and scaler
    model_path = os.path.join("models", "stock_price_model.keras")
    scaler_path = os.path.join("models", "scaler.pkl")
    os.makedirs("models", exist_ok=True)  # Create directory if it doesn't exist

    data = load_data(company, start, end)

    # Check if the model and scaler already exist
    if os.path.exists(model_path) and os.path.exists(scaler_path):
        print("Loading saved model and scaler...")
        model = load_model(model_path)
        scaler = joblib.load(scaler_path)
    else:
        print("No saved model found. Training a new model...")
        # Load and preprocess data
        x_train, y_train, scaler = preprocess_data(data, 'Close', prediction_days)

        # Build and train the model
        model = build_model(input_shape=(x_train.shape[1], 1))
        model.fit(x_train, y_train, epochs=25, batch_size=32)

        # Save the model and scaler
        save_model_and_scaler(model, scaler, model_path, scaler_path)
    
    # Load and prepare test data
    test_start = dt.datetime(2024, 1, 1)
    test_end = dt.datetime(2025, 1, 1)
    test_data = load_data(company, test_start, test_end)
    actual_prices = test_data['Close'].values

    # Prepare test data and make predictions
    x_test, model_inputs = prepare_test_data(data, test_data, prediction_days, scaler)
    predicted_prices = model.predict(x_test)
    predicted_prices = scaler.inverse_transform(predicted_prices)

    # Plot predictions
    plot_predictions(actual_prices, predicted_prices, company)

    # Prepare data for next day prediction
    last_prediction_data = model_inputs[-prediction_days:]  # Get the last `prediction_days` data
    next_day_price = predict_next_day_price(model, last_prediction_data, scaler)

    # Get the date of the next prediction
    last_date = test_data.index[-1]  # The last date in the test data
    next_date = last_date + dt.timedelta(days=1)  # The next day's date

    print(f"The predicted price for {next_date.strftime('%Y-%m-%d')} is: {next_day_price:.2f}")
    save_prediction_to_file(next_date, next_day_price)
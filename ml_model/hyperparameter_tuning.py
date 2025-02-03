import pandas as pd
import numpy as np
import yfinance as yf
import datetime as dt
import keras_tuner as kt
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout
import os

# Function to load stock data
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

# Define the hypermodel
def build_hypermodel(hp):
    model = Sequential()
    
    # First LSTM layer
    model.add(LSTM(
        units=hp.Int('units_1', min_value=30, max_value=100, step=10), 
        return_sequences=True, 
        input_shape=(prediction_days, 1)
    ))
    model.add(Dropout(hp.Float('dropout_1', min_value=0.1, max_value=0.5, step=0.1)))

    # Second LSTM layer
    model.add(LSTM(
        units=hp.Int('units_2', min_value=30, max_value=100, step=10), 
        return_sequences=True
    ))
    model.add(Dropout(hp.Float('dropout_2', min_value=0.1, max_value=0.5, step=0.1)))

    # Third LSTM layer
    model.add(LSTM(
        units=hp.Int('units_3', min_value=30, max_value=100, step=10)
    ))
    model.add(Dropout(hp.Float('dropout_3', min_value=0.1, max_value=0.5, step=0.1)))

    # Output layer
    model.add(Dense(units=1))

    # Compile the model
    model.compile(
        optimizer=hp.Choice('optimizer', ['adam', 'rmsprop']),
        loss='mean_squared_error'
    )
    
    return model

# Load data
company = 'TSLA'
start = dt.datetime(2014, 1, 1)
end = dt.datetime(2024, 1, 1)
prediction_days = 60

data = load_data(company, start, end)
x_train, y_train, scaler = preprocess_data(data, 'Close', prediction_days)

# Create a tuner for hyperparameter optimization
tuner = kt.Hyperband(
    build_hypermodel,
    objective='val_loss',
    max_epochs=20,
    factor=3,
    directory='tuning_results',
    project_name='stock_price_tuning'
)

# Perform hyperparameter tuning
tuner.search(x_train, y_train, validation_split=0.2, epochs=20, batch_size=32)

# Get the best hyperparameters
best_hps = tuner.get_best_hyperparameters(num_trials=1)[0]

# Print the best hyperparameters
print(f"""
Best hyperparameters:
- LSTM Layer 1 Units: {best_hps.get('units_1')}
- LSTM Layer 2 Units: {best_hps.get('units_2')}
- LSTM Layer 3 Units: {best_hps.get('units_3')}
- Dropout Rate 1: {best_hps.get('dropout_1')}
- Dropout Rate 2: {best_hps.get('dropout_2')}
- Dropout Rate 3: {best_hps.get('dropout_3')}
- Optimizer: {best_hps.get('optimizer')}
""")

# Build the best model
best_model = tuner.hypermodel.build(best_hps)

# Train the best model
best_model.fit(x_train, y_train, epochs=50, batch_size=32, validation_split=0.2)

# Save the best model
model_path = os.path.join("models", "best_stock_price_model.keras")
os.makedirs("models", exist_ok=True)
best_model.save(model_path)
print(f"Best model saved to {model_path}")
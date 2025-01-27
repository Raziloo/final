from flask import Flask, jsonify, request
import os
import json
import datetime as dt
from model import load_data, preprocess_data, build_model, predict_next_day_price, save_model_and_scaler
from flask_cors import CORS  # To handle CORS for React frontend
import joblib
from keras.models import load_model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Endpoint to predict stock price
@app.route('/api/predict', methods=['POST'])
def predict_stock_price():
    # Parse JSON input from frontend
    data = request.get_json()
    stock_symbol = data.get('ticker')  # Match React's JSON structure
    if not stock_symbol:
        return jsonify({"error": "Stock symbol is required"}), 400

    try:
        # Define prediction parameters
        start = dt.datetime(2014, 1, 1)
        end = dt.datetime(2024, 1, 1)
        prediction_days = 60
        model_path = os.path.join("models", f"{stock_symbol}_model.keras")
        scaler_path = os.path.join("models", f"{stock_symbol}_scaler.pkl")

        # Load data for the stock
        stock_data = load_data(stock_symbol, start, end)

        # Train or load the model
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            print(f"Loading saved model and scaler for {stock_symbol}...")
            model = load_model(model_path)
            scaler = joblib.load(scaler_path)
        else:
            print(f"Training new model for {stock_symbol}...")
            x_train, y_train, scaler = preprocess_data(stock_data, 'Close', prediction_days)
            model = build_model(input_shape=(x_train.shape[1], 1))
            model.fit(x_train, y_train, epochs=25, batch_size=32)
            save_model_and_scaler(model, scaler, model_path, scaler_path)

        # Predict the next day's price
        last_prediction_data = stock_data['Close'][-prediction_days:].values.reshape(-1, 1)
        scaler_transformed = scaler.transform(last_prediction_data)
        next_day_price = predict_next_day_price(model, scaler_transformed, scaler)

        # Return the prediction
        next_date = dt.datetime.now() + dt.timedelta(days=1)
        return jsonify({
            "stock_symbol": stock_symbol,
            "predicted_price": round(float(next_day_price), 2),  # Convert to Python float
            "date": next_date.strftime('%Y-%m-%d')
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
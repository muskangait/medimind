from flask import Flask, jsonify
from flask_cors import CORS
from routes.predict import predict_bp
import os

app = Flask(__name__)

# Allow requests from React frontend and Spring Boot
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173",
            "http://localhost:8081",
            "http://localhost:8082",
            "https://medimind.vercel.app"
        ]
    }
})

# Register blueprints
app.register_blueprint(predict_bp, url_prefix='/api/predict')

# Root health check
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        'success': True,
        'message': 'MediMind ML API is running',
        'version': '1.0.0',
        'endpoints': {
            'diabetes': '/api/predict/diabetes',
            'heart_disease': '/api/predict/heart',
            'hypertension': '/api/predict/hypertension',
            'health': '/api/predict/health'
        }
    })

@app.errorhandler(404)
def not_found(e):
    return jsonify({'success': False, 'message': 'Route not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'success': False, 'message': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
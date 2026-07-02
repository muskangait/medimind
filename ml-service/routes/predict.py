from flask import Blueprint, request, jsonify
from utils.helper import (
    predict_risk,
    get_diabetes_recommendations,
    get_heart_recommendations,
    get_hypertension_recommendations
)

predict_bp = Blueprint('predict', __name__)

# ============================================================
# DIABETES PREDICTION
# ============================================================
@predict_bp.route('/diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.get_json()

        required = ['pregnancies', 'glucose', 'blood_pressure',
                    'skin_thickness', 'insulin', 'bmi',
                    'diabetes_pedigree', 'age']

        for field in required:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing field: {field}'
                }), 400

        features = [
            float(data['pregnancies']),
            float(data['glucose']),
            float(data['blood_pressure']),
            float(data['skin_thickness']),
            float(data['insulin']),
            float(data['bmi']),
            float(data['diabetes_pedigree']),
            float(data['age'])
        ]

        result = predict_risk(features, 'diabetes')
        recommendations = get_diabetes_recommendations(result['risk_level'])

        return jsonify({
            'success': True,
            'disease_type': 'diabetes',
            'risk_percentage': result['risk_percentage'],
            'risk_level': result['risk_level'],
            'lr_probability': result['lr_probability'],
            'rf_probability': result['rf_probability'],
            'ensemble_probability': result['ensemble_probability'],
            'specialist_type': 'Endocrinologist',
            'recommendations': recommendations
        })

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


# ============================================================
# HEART DISEASE PREDICTION
# ============================================================
@predict_bp.route('/heart', methods=['POST'])
def predict_heart():
    try:
        data = request.get_json()

        required = ['age', 'gender', 'chest_pain', 'resting_bp',
                    'cholesterol', 'fasting_bs', 'resting_ecg',
                    'max_hr', 'exercise_angina', 'oldpeak', 'st_slope']

        for field in required:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing field: {field}'
                }), 400

        features = [
            float(data['age']),
            float(data['gender']),
            float(data['chest_pain']),
            float(data['resting_bp']),
            float(data['cholesterol']),
            float(data['fasting_bs']),
            float(data['resting_ecg']),
            float(data['max_hr']),
            float(data['exercise_angina']),
            float(data['oldpeak']),
            float(data['st_slope'])
        ]

        result = predict_risk(features, 'heart_disease')
        recommendations = get_heart_recommendations(result['risk_level'])

        return jsonify({
            'success': True,
            'disease_type': 'heart_disease',
            'risk_percentage': result['risk_percentage'],
            'risk_level': result['risk_level'],
            'lr_probability': result['lr_probability'],
            'rf_probability': result['rf_probability'],
            'ensemble_probability': result['ensemble_probability'],
            'specialist_type': 'Cardiologist',
            'recommendations': recommendations
        })

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


# ============================================================
# HYPERTENSION PREDICTION
# ============================================================
@predict_bp.route('/hypertension', methods=['POST'])
def predict_hypertension():
    try:
        data = request.get_json()

        required = ['age', 'bmi', 'gender', 'smoking', 'alcohol',
                    'physical_activity', 'salt_intake', 'stress_level',
                    'family_history', 'diabetes', 'cholesterol']

        for field in required:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'Missing field: {field}'
                }), 400

        features = [
            float(data['age']),
            float(data['bmi']),
            float(data['gender']),
            float(data['smoking']),
            float(data['alcohol']),
            float(data['physical_activity']),
            float(data['salt_intake']),
            float(data['stress_level']),
            float(data['family_history']),
            float(data['diabetes']),
            float(data['cholesterol'])
        ]

        result = predict_risk(features, 'hypertension')
        recommendations = get_hypertension_recommendations(result['risk_level'])

        return jsonify({
            'success': True,
            'disease_type': 'hypertension',
            'risk_percentage': result['risk_percentage'],
            'risk_level': result['risk_level'],
            'lr_probability': result['lr_probability'],
            'rf_probability': result['rf_probability'],
            'ensemble_probability': result['ensemble_probability'],
            'specialist_type': 'General Physician',
            'recommendations': recommendations
        })

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500


# ============================================================
# HEALTH CHECK
# ============================================================
@predict_bp.route('/health', methods=['GET'])
def health():
    return jsonify({
        'success': True,
        'message': 'MediMind ML Service is running',
        'models': ['diabetes', 'heart_disease', 'hypertension']
    })
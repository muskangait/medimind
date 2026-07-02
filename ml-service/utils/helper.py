import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import joblib
import os

def get_risk_level(probability):
    if probability < 0.25:
        return "low"
    elif probability < 0.50:
        return "moderate"
    elif probability < 0.75:
        return "high"
    else:
        return "very_high"

def get_risk_percentage(probability):
    return round(probability * 100, 2)

def train_models(X, y, model_name):
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Logistic Regression
    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_train_scaled, y_train)
    lr_acc = accuracy_score(y_test, lr.predict(X_test_scaled))

    # Random Forest
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X_train, y_train)
    rf_acc = accuracy_score(y_test, rf.predict(X_test))

    print(f"{model_name} - LR Accuracy: {lr_acc:.3f}, RF Accuracy: {rf_acc:.3f}")

    # Save models
    os.makedirs('models', exist_ok=True)
    joblib.dump(lr, f'models/{model_name}_lr.pkl')
    joblib.dump(rf, f'models/{model_name}_rf.pkl')
    joblib.dump(scaler, f'models/{model_name}_scaler.pkl')

    return lr, rf, scaler

def predict_risk(features, model_name):
    try:
        lr = joblib.load(f'models/{model_name}_lr.pkl')
        rf = joblib.load(f'models/{model_name}_rf.pkl')
        scaler = joblib.load(f'models/{model_name}_scaler.pkl')

        features_array = np.array(features).reshape(1, -1)
        features_scaled = scaler.transform(features_array)

        lr_prob = lr.predict_proba(features_scaled)[0][1]
        rf_prob = rf.predict_proba(features_array)[0][1]

        # Ensemble - average of both
        ensemble_prob = (lr_prob + rf_prob) / 2

        return {
            'lr_probability': round(float(lr_prob), 4),
            'rf_probability': round(float(rf_prob), 4),
            'ensemble_probability': round(float(ensemble_prob), 4),
            'risk_percentage': get_risk_percentage(ensemble_prob),
            'risk_level': get_risk_level(ensemble_prob)
        }
    except Exception as e:
        raise Exception(f"Model prediction error: {str(e)}")

def get_diabetes_recommendations(risk_level):
    base = [
        "Monitor blood glucose levels regularly",
        "Maintain a balanced diet low in refined sugars",
        "Exercise at least 30 minutes daily",
        "Stay hydrated and avoid sugary drinks"
    ]
    if risk_level in ['high', 'very_high']:
        base.extend([
            "Consult an endocrinologist immediately",
            "Consider HbA1c testing every 3 months",
            "Monitor for diabetes symptoms daily"
        ])
    return base

def get_heart_recommendations(risk_level):
    base = [
        "Maintain a heart-healthy diet low in saturated fats",
        "Exercise regularly — at least 150 minutes per week",
        "Monitor blood pressure and cholesterol",
        "Avoid smoking and limit alcohol"
    ]
    if risk_level in ['high', 'very_high']:
        base.extend([
            "Consult a cardiologist immediately",
            "Consider an ECG and stress test",
            "Monitor for chest pain or shortness of breath"
        ])
    return base

def get_hypertension_recommendations(risk_level):
    base = [
        "Reduce salt intake in your diet",
        "Exercise regularly to maintain healthy weight",
        "Manage stress through meditation or yoga",
        "Monitor blood pressure weekly"
    ]
    if risk_level in ['high', 'very_high']:
        base.extend([
            "Consult a physician for blood pressure medication",
            "Monitor blood pressure daily",
            "Reduce caffeine and alcohol intake"
        ])
    return base
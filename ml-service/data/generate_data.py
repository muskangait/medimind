import pandas as pd
import numpy as np

np.random.seed(42)
N = 1000

# ============================================================
# DIABETES DATASET
# ============================================================
def generate_diabetes_data():
    age = np.random.randint(20, 80, N)
    bmi = np.random.uniform(18, 45, N)
    glucose = np.random.uniform(70, 200, N)
    blood_pressure = np.random.uniform(60, 120, N)
    insulin = np.random.uniform(0, 300, N)
    skin_thickness = np.random.uniform(10, 50, N)
    pregnancies = np.random.randint(0, 15, N)
    diabetes_pedigree = np.random.uniform(0.1, 2.5, N)

    # Realistic outcome based on risk factors
    risk_score = (
        (glucose > 140).astype(int) * 3 +
        (bmi > 30).astype(int) * 2 +
        (age > 45).astype(int) * 1.5 +
        (blood_pressure > 90).astype(int) * 1 +
        (diabetes_pedigree > 1.0).astype(int) * 1.5
    )
    outcome = (risk_score + np.random.normal(0, 1, N) > 4).astype(int)

    df = pd.DataFrame({
        'pregnancies': pregnancies,
        'glucose': glucose,
        'blood_pressure': blood_pressure,
        'skin_thickness': skin_thickness,
        'insulin': insulin,
        'bmi': bmi,
        'diabetes_pedigree': diabetes_pedigree,
        'age': age,
        'outcome': outcome
    })
    df.to_csv('data/diabetes.csv', index=False)
    print(f"Diabetes dataset: {len(df)} rows, {outcome.sum()} positive cases")
    return df

# ============================================================
# HEART DISEASE DATASET
# ============================================================
def generate_heart_disease_data():
    age = np.random.randint(25, 80, N)
    gender = np.random.randint(0, 2, N)  # 0=female, 1=male
    chest_pain = np.random.randint(0, 4, N)
    resting_bp = np.random.uniform(90, 180, N)
    cholesterol = np.random.uniform(150, 350, N)
    fasting_bs = np.random.randint(0, 2, N)
    resting_ecg = np.random.randint(0, 3, N)
    max_hr = np.random.uniform(70, 200, N)
    exercise_angina = np.random.randint(0, 2, N)
    oldpeak = np.random.uniform(0, 6, N)
    st_slope = np.random.randint(0, 3, N)

    risk_score = (
        (age > 55).astype(int) * 2 +
        (gender == 1).astype(int) * 1 +
        (cholesterol > 240).astype(int) * 2 +
        (resting_bp > 140).astype(int) * 1.5 +
        (exercise_angina == 1).astype(int) * 2 +
        (chest_pain > 2).astype(int) * 1.5 +
        (oldpeak > 2).astype(int) * 1.5
    )
    outcome = (risk_score + np.random.normal(0, 1, N) > 5).astype(int)

    df = pd.DataFrame({
        'age': age,
        'gender': gender,
        'chest_pain': chest_pain,
        'resting_bp': resting_bp,
        'cholesterol': cholesterol,
        'fasting_bs': fasting_bs,
        'resting_ecg': resting_ecg,
        'max_hr': max_hr,
        'exercise_angina': exercise_angina,
        'oldpeak': oldpeak,
        'st_slope': st_slope,
        'outcome': outcome
    })
    df.to_csv('data/heart_disease.csv', index=False)
    print(f"Heart disease dataset: {len(df)} rows, {outcome.sum()} positive cases")
    return df

# ============================================================
# HYPERTENSION DATASET
# ============================================================
def generate_hypertension_data():
    age = np.random.randint(18, 80, N)
    bmi = np.random.uniform(18, 45, N)
    gender = np.random.randint(0, 2, N)
    smoking = np.random.randint(0, 2, N)
    alcohol = np.random.randint(0, 2, N)
    physical_activity = np.random.randint(0, 4, N)
    salt_intake = np.random.randint(0, 3, N)
    stress_level = np.random.randint(1, 10, N)
    family_history = np.random.randint(0, 2, N)
    diabetes = np.random.randint(0, 2, N)
    cholesterol = np.random.uniform(150, 350, N)

    risk_score = (
        (age > 50).astype(int) * 2 +
        (bmi > 30).astype(int) * 2 +
        (smoking == 1).astype(int) * 1.5 +
        (salt_intake > 1).astype(int) * 1.5 +
        (stress_level > 7).astype(int) * 1 +
        (family_history == 1).astype(int) * 2 +
        (diabetes == 1).astype(int) * 1.5 +
        (physical_activity < 1).astype(int) * 1
    )
    outcome = (risk_score + np.random.normal(0, 1, N) > 5).astype(int)

    df = pd.DataFrame({
        'age': age,
        'bmi': bmi,
        'gender': gender,
        'smoking': smoking,
        'alcohol': alcohol,
        'physical_activity': physical_activity,
        'salt_intake': salt_intake,
        'stress_level': stress_level,
        'family_history': family_history,
        'diabetes': diabetes,
        'cholesterol': cholesterol,
        'outcome': outcome
    })
    df.to_csv('data/hypertension.csv', index=False)
    print(f"Hypertension dataset: {len(df)} rows, {outcome.sum()} positive cases")
    return df

if __name__ == '__main__':
    print("Generating datasets...")
    generate_diabetes_data()
    generate_heart_disease_data()
    generate_hypertension_data()
    print("All datasets generated successfully!")
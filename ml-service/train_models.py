import pandas as pd
from utils.helper import train_models

def train_all():
    print("=" * 50)
    print("Training MediMind ML Models")
    print("=" * 50)

    # ========================
    # DIABETES MODEL
    # ========================
    print("\n1. Training Diabetes Model...")
    df = pd.read_csv('data/diabetes.csv')
    X = df.drop('outcome', axis=1).values
    y = df['outcome'].values
    train_models(X, y, 'diabetes')
    print("✅ Diabetes model saved!")

    # ========================
    # HEART DISEASE MODEL
    # ========================
    print("\n2. Training Heart Disease Model...")
    df = pd.read_csv('data/heart_disease.csv')
    X = df.drop('outcome', axis=1).values
    y = df['outcome'].values
    train_models(X, y, 'heart_disease')
    print("✅ Heart disease model saved!")

    # ========================
    # HYPERTENSION MODEL
    # ========================
    print("\n3. Training Hypertension Model...")
    df = pd.read_csv('data/hypertension.csv')
    X = df.drop('outcome', axis=1).values
    y = df['outcome'].values
    train_models(X, y, 'hypertension')
    print("✅ Hypertension model saved!")

    print("\n" + "=" * 50)
    print("All models trained and saved successfully!")
    print("Models saved in: models/")
    print("=" * 50)

if __name__ == '__main__':
    train_all()
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Sample dataset (later we can replace with Kaggle CSV)
data = {
    "study": [2,4,6,8,10,3,5,7,9,1],
    "attendance": [60,70,75,85,90,65,72,80,88,50],
    "sleep": [5,6,7,8,6,5,7,8,6,4],
    "stress": [8,6,5,3,2,7,6,4,3,9],
    "score": [40,55,65,80,92,50,68,78,88,35]
}

df = pd.DataFrame(data)

X = df[["study","attendance","sleep","stress"]]
y = df["score"]

model = LinearRegression()
model.fit(X,y)

joblib.dump(model, "model.pkl")

print("Model trained and saved.")
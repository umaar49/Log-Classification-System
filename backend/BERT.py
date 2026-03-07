from sentence_transformers import SentenceTransformer
import joblib

classify_model = joblib.load(
    r'C:\UMAR DATA\Data Sciences\Deep Learning new\projects\log classification project\bert_model\model.joblib')
model=SentenceTransformer("all-MiniLM-L6-v2")

def bert_function(log_message):

    embedding=model.encode(log_message)
    probability=classify_model.predict_proba([embedding])[0]
    if max(probability)<0.5:
        return "unclassify"
    predicted_class=classify_model.predict([embedding])[0]
    return predicted_class

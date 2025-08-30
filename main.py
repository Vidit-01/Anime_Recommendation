import tensorflow as tf
import pandas as pd
from cfmodel import CFModel
from flask import Flask,request,jsonify
from flask_cors import CORS
df_sample = pd.read_csv('anime_list.csv',usecols=["anime_id","title"]).astype(str)
unique_animes= pd.read_csv("anime.csv")["anime_id"].astype(str).tolist()
unique_users = pd.read_csv("userlist.csv")["username"].astype(str).tolist()
df = pd.read_csv("poster.csv").astype(str)
def cfmodel_loader(*args, **kwargs):
    return CFModel(users=unique_users, items=unique_animes, embedding_dim=32, **kwargs)

df_merged = pd.merge(df_sample, df, on='anime_id')
model = tf.keras.models.load_model("anime.keras",custom_objects={"CFModel":cfmodel_loader})
model = model(unique_users,unique_animes)

def recommend_for_anime_ids(liked_ids, k=5):
    liked_ids = [str(a) for a in liked_ids if str(a) in unique_animes]
    if not liked_ids:
        return []
    liked_emb = model.item_model(tf.constant(liked_ids))
    user_emb = tf.reduce_mean(liked_emb, axis=0, keepdims=True)
    all_item_emb = model.item_model(tf.constant(unique_animes))
    scores = tf.linalg.matmul(user_emb, all_item_emb, transpose_b=True)
    top_k = tf.math.top_k(scores, k=k+len(liked_ids))
    recs = [unique_animes[i] for i in top_k.indices.numpy()[0] if unique_animes[i] not in liked_ids]
    return recs[:k]


app = Flask(__name__)
CORS(app)
@app.route("/recc",methods=["POST"])
def recc():
    liked_anime = request.get_json()["anime"]
    liked_anime = [z["anime_id"] for z in liked_anime]
    recc_anime = recommend_for_anime_ids(liked_anime)
    reccs = df_merged[df_merged['anime_id'].isin(recc_anime)].to_dict(orient='records')
    
    return jsonify(reccs)

@app.route("/search")
def search():
    query = request.args.get("q", "").lower()
    if not query:
        return jsonify(results=[])
    
    filtered = df_sample[df_sample['title'].str.lower().str.startswith(query)]
    results = filtered[['anime_id', 'title']].to_dict(orient='records')
    
    return jsonify(results=results)
if __name__=="__main__":
    
    app.run()
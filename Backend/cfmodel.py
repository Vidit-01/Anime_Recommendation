import tensorflow as tf
import tensorflow_recommenders as tfrs
class CFModel(tfrs.Model):
    def __init__(self, users, items, embedding_dim=64,**kwargs):
        super().__init__()
        self.user_model = tf.keras.Sequential([
            tf.keras.layers.StringLookup(vocabulary=users, mask_token=None),
            tf.keras.layers.Embedding(len(users)+1, embedding_dim)
        ])
        self.item_model = tf.keras.Sequential([
            tf.keras.layers.StringLookup(vocabulary=items, mask_token=None),
            tf.keras.layers.Embedding(len(items)+1, embedding_dim)
        ])

        # Ranking task (predict ratings)
        self.task = tfrs.tasks.Ranking(
            loss=tf.keras.losses.MeanSquaredError(),
            metrics=[tf.keras.metrics.RootMeanSquaredError()]
        )

    def compute_loss(self, features, training=False):
        user_emb = self.user_model(features["username"])
        item_emb = self.item_model(features["anime_id"])
        rating = features["my_score"]

        preds = tf.reduce_sum(user_emb * item_emb, axis=1)
        return self.task(labels=rating, predictions=preds)
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

def getConnection():
    try:
        cliente = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=3000)
        cliente.admin.command("ping")  # Verificamos conexión con un ping
        print("✅ Conexión a MongoDB establecida correctamente.")
        db = cliente["ecoloop"]
        return db
    except ConnectionFailure as e:
        print("❌ Error de conexión a MongoDB:", e)
        return None




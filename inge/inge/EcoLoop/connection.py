from pymongo import MongoClient

def getConnection():
    cliente = MongoClient("mongodb://localhost:27017/")
    db = cliente["ecoloop"]
    
    return db
   




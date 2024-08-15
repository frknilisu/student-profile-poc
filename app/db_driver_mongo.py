# app/db_driver_mongo.py
from pymongo import MongoClient
from bson.objectid import ObjectId
from app.models import Student
from app.db_interface import DatabaseDriverInterface

class MongoDBDriver(DatabaseDriverInterface):
    def __init__(self, db_name="student_db", collection_name="students"):
        self.client = MongoClient('localhost', 27017)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def create_student(self, student):
        document = student.to_dict()
        result = self.collection.insert_one(document)
        return str(result.inserted_id)

    def get_student(self, student_id):
        document = self.collection.find_one({"_id": ObjectId(student_id)})
        if document:
            student = Student.from_dict(document)
            return student.to_dict()
        return None
    
    def get_all_students(self):
        documents = self.collection.find()
        students = [Student.from_dict(doc).to_dict() for doc in documents]
        return students

    def update_student(self, student_id, data):        
       return self.collection.update_one({"_id": ObjectId(student_id)}, {"$set": data})

    def delete_student(self, student_id):
        self.collection.delete_one({"_id": ObjectId(student_id)})

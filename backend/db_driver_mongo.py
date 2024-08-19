# app/db_driver_mongo.py
from pymongo import MongoClient
from bson.objectid import ObjectId
from backend.models import Student, Group
from backend.db_interface import DatabaseDriverInterface

class MongoDBDriver(DatabaseDriverInterface):
    def __init__(self, db_name="student_db"):
        self.client = MongoClient('localhost', 27017)
        self.db = self.client[db_name]
        self.students_collection = self.db.students
        self.groups_collection = self.db.groups

    def create_student(self, student):
        document = student.to_dict()
        result = self.students_collection.insert_one(document)
        return str(result.inserted_id)

    def get_student(self, student_id):
        document = self.students_collection.find_one({"_id": ObjectId(student_id)})
        if document:
            student = Student.from_dict(document)
            student.student_id = str(document['_id'])
            return student.to_dict()
        return None
    
    def get_all_students(self):
        documents = self.students_collection.find()
        students = [Student.from_dict(doc).to_dict() for doc in documents]
        return students

    def update_student(self, student_id, data):        
       return self.students_collection.update_one({"_id": ObjectId(student_id)}, {"$set": data})

    def delete_student(self, student_id):
        self.students_collection.delete_one({"_id": ObjectId(student_id)})
    
    # ------------------------------------------------------------------- #
    # ------------------------------------------------------------------- #
    # ------------------------------------------------------------------- #

    # Group Methods
    def create_group(self, group):
        document = group.to_dict()
        result = self.groups_collection.insert_one(document)
        return str(result.inserted_id)

    def get_group(self, group_id):
        document = self.groups_collection.find_one({"group_id": group_id})
        if document:
            group = Group.from_dict(document)
            return group.to_dict()
        return None

    def get_all_groups(self):
        documents = self.groups_collection.find()
        groups = [Group.from_dict(doc).to_dict() for doc in documents]
        return groups

    def update_group(self, group_id, data):
        self.groups_collection.update_one({"group_id": int(group_id)}, {"$set": data})

    def delete_group(self, group_id):
        self.groups_collection.delete_one({"group_id": int(group_id)})

    def get_students_by_group(self, group_id):
        documents = self.students_collection.find({"group_id": int(group_id)})
        students = [Student.from_dict(doc).to_dict() for doc in documents]
        return students

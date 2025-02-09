from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from extentions import mongo
from models.student import Student

student_bp = Blueprint('students', __name__, url_prefix='/api/students')

@student_bp.route('/', methods=['GET'])
def get_students():
    students = list(mongo.db.students.find())
    return jsonify([Student(**student).to_dict() for student in students])

@student_bp.route('/<id>', methods=['GET'])
def get_student(id):
    print(id)
    student = mongo.db.students.find_one({"_id": ObjectId(id)})
    return jsonify(Student(**student).to_dict()) if student else ('', 404)

@student_bp.route('/', methods=['POST'])
def create_student():   
    data = request.json
    print(data)
    student = Student(**data)
    result = mongo.db.students.insert_one(student.to_dict())
    return jsonify({"id": str(result.inserted_id)}), 201

@student_bp.route('/<id>', methods=['PUT'])
def update_student(id):
    data = request.json
    mongo.db.students.update_one({"_id": ObjectId(id)}, {"$set": data})
    return '', 204

@student_bp.route('/<id>', methods=['DELETE'])
def delete_student(id):
    mongo.db.students.delete_one({"_id": ObjectId(id)})
    return '', 204

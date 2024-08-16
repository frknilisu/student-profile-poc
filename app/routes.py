# app/routes.py
from flask import Flask, request, jsonify
from app.models import Student, Group
from app.db_driver_mongo import MongoDBDriver
# from app.db_driver_mysql import MySQLDriver

app = Flask(__name__)

# Choose the appropriate driver
db_driver = MongoDBDriver()
# db_driver = MySQLDriver()

@app.route('/createStudent', methods=['POST'])
def create_student():
    data = request.json
    student = Student.from_dict(data)
    student_id = db_driver.create_student(student)
    return jsonify({"message": "Student created", "student_id": str(student_id)}), 201

@app.route('/getStudents', methods=['GET'])
def get_students():
    all_students = db_driver.get_all_students()
    return jsonify(all_students), 200

@app.route('/getStudent/<student_id>', methods=['GET'])
def get_student(student_id):
    student = db_driver.get_student(student_id)
    if student:
        return jsonify(student), 200
    else:
        return jsonify({"message": "Student not found"}), 404

@app.route('/updateStudent/<student_id>', methods=['PUT'])
def update_student(student_id):
    update_data = request.json
    db_driver.update_student(student_id, update_data)
    return jsonify({"message": "Student updated"}), 200

@app.route('/deleteStudent/<student_id>', methods=['DELETE'])
def delete_student(student_id):
    db_driver.delete_student(student_id)
    return jsonify({"message": "Student deleted"}), 200

# ------------------------------------------------------------------- #
# ------------------------------------------------------------------- #
# ------------------------------------------------------------------- #

@app.route('/createGroup', methods=['POST'])
def create_group():
    data = request.json
    group = Group.from_dict(data)
    group_id = db_driver.create_group(group)
    return jsonify({"message": "Group created", "group_id": group_id}), 201

@app.route('/getGroups', methods=['GET'])
def get_groups():
    groups = db_driver.get_all_groups()
    for group in groups:
        group['students'] = db_driver.get_students_by_group(group['group_id'])  # Include students in the response
    return jsonify(groups), 200

@app.route('/getGroup/<int:group_id>', methods=['GET'])
def get_group(group_id):
    group = db_driver.get_group(group_id)
    if group:
        group['students'] = db_driver.get_students_by_group(group_id)  # Include students in the response
        return jsonify(group), 200
    else:
        return jsonify({"message": "Group not found"}), 404

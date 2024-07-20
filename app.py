from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='student-portal/build')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///students.db"
db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email, "phone": self.phone}

# API endpoint to get all students
@app.route("/api/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    return jsonify([student.to_dict() for student in students])

# API endpoint to create a new student
@app.route("/api/students", methods=["POST"])
def create_student():
    new_student = Student(
        name=request.json["name"],
        email=request.json["email"],
        phone=request.json["phone"],
    )
    db.session.add(new_student)
    db.session.commit()
    return jsonify(new_student.to_dict()), 201

# API endpoint to get a single student
@app.route("/api/students/<int:student_id>", methods=["GET"])
def get_student(student_id):
    student = Student.query.get(student_id)
    if student is None:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(student.to_dict())

# API endpoint to update a student
@app.route("/api/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    student = Student.query.get(student_id)
    if student is None:
        return jsonify({"error": "Student not found"}), 404
    student.name = request.json.get("name", student.name)
    student.email = request.json.get("email", student.email)
    student.phone = request.json.get("phone", student.phone)
    db.session.commit()
    return jsonify(student.to_dict())

# API endpoint to delete a student
@app.route("/api/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    student = Student.query.get(student_id)
    if student is None:
        return jsonify({"error": "Student not found"}), 404
    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Student deleted"})

if __name__ == "__main__":
    app.run(debug=True)
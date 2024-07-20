from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__, static_folder='student-portal/build', static_url_path='')

# Connect to SQLite database
conn = sqlite3.connect('students.db')
cursor = conn.cursor()

# Create table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT
    )
''')
conn.commit()

# API to get all students
@app.route('/api/students', methods=['GET'])
def get_students():
    cursor.execute('SELECT * FROM students')
    students = cursor.fetchall()
    return jsonify([{'id': student[0], 'name': student[1], 'email': student[2], 'phone': student[3]} for student in students])

# API to get a single student
@app.route('/api/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    cursor.execute('SELECT * FROM students WHERE id=?', (student_id,))
    student = cursor.fetchone()
    if student:
        return jsonify({'id': student[0], 'name': student[1], 'email': student[2], 'phone': student[3]})
    else:
        return jsonify({'error': 'Student not found'}), 404

# API to create a new student
@app.route('/api/students', methods=['POST'])
def create_student():
    data = request.get_json()
    cursor.execute('INSERT INTO students (name, email, phone) VALUES (?, ?, ?)',
                     (data['name'], data['email'], data['phone']))
    conn.commit()
    return jsonify({'id': cursor.lastrowid, 'name': data['name'], 'email': data['email'], 'phone': data['phone']}), 201

# API to update a student
@app.route('/api/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    data = request.get_json()
    cursor.execute('UPDATE students SET name=?, email=?, phone=? WHERE id=?',
                     (data['name'], data['email'], data['phone'], student_id))
    conn.commit()
    return jsonify({'id': student_id, 'name': data['name'], 'email': data['email'], 'phone': data['phone']}), 200

# API to delete a student
@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    cursor.execute('DELETE FROM students WHERE id=?', (student_id,))
    conn.commit()
    return jsonify({'message': 'Student deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)
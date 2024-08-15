# app/db_driver_mysql.py
import mysql.connector
from app.db_interface import DatabaseDriverInterface

class MySQLDriver(DatabaseDriverInterface):
    def __init__(self, host="localhost", user="root", password="", database="student_db"):
        self.connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.connection.cursor(dictionary=True)
    
    def create_student(self, student):
        sql = "INSERT INTO students (name, age, student_id) VALUES (%s, %s, %s)"
        values = (student.name, student.age, student.student_id)
        self.cursor.execute(sql, values)
        self.connection.commit()
        return self.cursor.lastrowid

    def get_student(self, student_id):
        sql = "SELECT * FROM students WHERE student_id = %s"
        self.cursor.execute(sql, (student_id,))
        return self.cursor.fetchone()

    def update_student(self, student_id, data):
        sql = "UPDATE students SET name = %s, age = %s WHERE student_id = %s"
        values = (data.get('name'), data.get('age'), student_id)
        self.cursor.execute(sql, values)
        self.connection.commit()

    def delete_student(self, student_id):
        sql = "DELETE FROM students WHERE student_id = %s"
        self.cursor.execute(sql, (student_id,))
        self.connection.commit()

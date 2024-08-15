# app/db_interface.py
from abc import ABC, abstractmethod
from app.models import Student

class DatabaseDriverInterface(ABC):
    @abstractmethod
    def create_student(self, student: Student):
        pass

    @abstractmethod
    def get_student(self, student_id: str):
        pass

    @abstractmethod
    def get_all_students(self):
        pass

    @abstractmethod
    def update_student(self, student_id: str, data: dict):
        pass

    @abstractmethod
    def delete_student(self, student_id: str):
        pass

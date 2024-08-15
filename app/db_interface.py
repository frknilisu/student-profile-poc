# app/db_interface.py
from abc import ABC, abstractmethod
from app.models import Student, Group

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

    # ------------------------------------------------------------------- #
    # ------------------------------------------------------------------- #
    # ------------------------------------------------------------------- #

    # Group-related methods
    @abstractmethod
    def create_group(self, group: Group):
        pass

    @abstractmethod
    def get_group(self, group_id: str):
        pass

    @abstractmethod
    def get_all_groups(self):
        pass

    @abstractmethod
    def update_group(self, group_id: str, data: dict):
        pass

    @abstractmethod
    def delete_group(self, group_id: str):
        pass

    @abstractmethod
    def get_students_by_group(self, group_id: str):
        pass
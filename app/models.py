# app/models.py
class Student:
    def __init__(self, name, surname, grade, school, birthday, age, mobile_number, group_id=None, student_id=None):
        self.name = name
        self.surname = surname
        self.grade = grade
        self.school = school
        self.birthday = birthday
        self.age = age
        self.mobile_number = mobile_number
        self.group_id = group_id  # New field for group association
        self.student_id = student_id

    def to_dict(self):
        data = {
            "name": self.name,
            "surname": self.surname,
            "grade": self.grade,
            "school": self.school,
            "birthday": self.birthday,
            "age": self.age,
            "mobile_number": self.mobile_number
        }
        if self.student_id:
            data["student_id"] = self.student_id
        return data

    @classmethod
    def from_dict(cls, data):
        return cls(
            name=data.get("name"),
            surname=data.get("surname"),
            grade=data.get("grade"),
            school=data.get("school"),
            birthday=data.get("birthday"),
            age=data.get("age"),
            mobile_number=data.get("mobile_number"),
            student_id=str(data.get("_id"))
        )


# app/models.py

class Group:
    def __init__(self, leader_id, group_name, group_id=None):
        self.leader_id = leader_id
        self.group_name = group_name
        self.group_id = group_id

    def to_dict(self):
        data = {
            "leader_id": self.leader_id,
            "group_name": self.group_name,
        }
        if self.group_id:
            data["group_id"] = self.group_id
        return data

    @classmethod
    def from_dict(cls, data):
        return cls(
            leader_id=data.get("leader_id"),
            group_name=data.get("group_name"),
            group_id=data.get("group_id")
        )

# app/models.py
class Student:
    def __init__(self, name, surname, class_level, school, birthday, mobile_number, group_id=None, student_id=None):
        self.name = name
        self.surname = surname
        self.class_level = class_level
        self.school = school
        self.birthday = birthday
        self.mobile_number = mobile_number
        self.group_id = group_id  # New field for group association
        self.student_id = student_id

    def to_dict(self):
        data = {
            "name": self.name,
            "surname": self.surname,
            "class_level": self.class_level,
            "school": self.school,
            "birthday": self.birthday,
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
            class_level=data.get("class_level"),
            school=data.get("school"),
            birthday=data.get("birthday"),
            mobile_number=data.get("mobile_number"),
            student_id=str(data.get("_id"))
        )


class Group:
    def __init__(self, supervisor_name, group_id):
        self.supervisor_name = supervisor_name
        self.group_id = group_id

    def to_dict(self):
        data = {
            "supervisor_name": self.supervisor_name,
            "group_id": self.group_id
        }
        return data

    @classmethod
    def from_dict(cls, data):
        return cls(
            supervisor_name=data.get("supervisor_name"),
            group_id=data.get("group_id")
        )

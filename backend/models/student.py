from bson import ObjectId
from .WeeklyRecord import WeeklyRecord

class Student:
    def __init__(self, name, surname, class_level, school, birthday, mobile_number, address, parent_name, parent_number, weekly_records=None, _id=None):
        if _id:
            self._id = ObjectId(_id)
        self.name = name
        self.surname = surname
        self.class_level = class_level
        self.school = school
        self.birthday = birthday
        self.mobile_number = mobile_number
        self.address = address
        self.parent_name = parent_name
        self.parent_number = parent_number
        self.weekly_records = [WeeklyRecord(**record) for record in weekly_records] if weekly_records else []

    def to_dict(self):
        data = {
            "name": self.name,
            "surname": self.surname,
            "class_level": self.class_level,
            "school": self.school,
            "birthday": self.birthday,
            "mobile_number": self.mobile_number,
            "address": self.address,
            "parent_name": self.parent_name,
            "parent_number": self.parent_number,
            "weekly_records": [record.to_dict() for record in self.weekly_records]
        }
        if hasattr(self, '_id') and self._id:
            data["_id"] = str(self._id)
        return data


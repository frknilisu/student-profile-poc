from bson import ObjectId

class Student:
    def __init__(self, name, surname, class_level, school, birthday, mobile_number, address, parent_name, parent_number, group_id=None, _id=None):
        self._id = ObjectId(_id) if _id else None
        self.name = name
        self.surname = surname
        self.class_level = class_level
        self.school = school
        self.birthday = birthday
        self.mobile_number = mobile_number
        self.address = address
        self.parent_name = parent_name
        self.parent_number = parent_number
        self.group_id = ObjectId(group_id) if group_id else None

    def to_dict(self):
        return {
            "_id": str(self._id),
            "name": self.name,
            "surname": self.surname,
            "class_level": self.class_level,
            "school": self.school,
            "birthday": self.birthday,
            "mobile_number": self.mobile_number,
            "address": self.address,
            "parent_name": self.parent_name,
            "parent_number": self.parent_number,
            "group_id": str(self.group_id) if self.group_id else None
        }

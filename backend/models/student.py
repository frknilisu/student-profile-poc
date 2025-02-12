from bson import ObjectId

class Student:
    def __init__(self, name, surname, class_level, school, birthday, mobile_number, address, parent_name, parent_number, supervisor_name="", _id=None):
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
        # self.is_active = True if group_id else False
        # self.supervisor_name = supervisor_name

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
            # "supervisor_name": self.supervisor_name
        }
        if hasattr(self, '_id') and self._id:
            data["_id"] = str(self._id)
        return data


from bson import ObjectId

class Supervisor:
    def __init__(self, name, birthday, _id=None):
        if _id:
            self._id = ObjectId(_id)
        self.name = name
        self.birthday = birthday

    def to_dict(self):
        data = {
            "name": self.name,
            "birthday": self.birthday
        }
        if hasattr(self, '_id') and self._id:
            data["_id"] = str(self._id)
        return data

from bson import ObjectId

class Supervisor:
    def __init__(self, name, birthday, _id=None):
        self._id = ObjectId(_id) if _id else None
        self.name = name
        self.birthday = birthday

    def to_dict(self):
        return {
            "_id": str(self._id),
            "name": self.name,
            "birthday": self.birthday
        }

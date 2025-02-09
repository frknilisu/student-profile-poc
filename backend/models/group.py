from bson import ObjectId

class Group:
    def __init__(self, name, supervisor_id, student_ids=None, _id=None):
        self._id = ObjectId(_id) if _id else None
        self.name = name
        self.supervisor_id = ObjectId(supervisor_id)
        self.student_ids = [ObjectId(id) for id in student_ids] if student_ids else []

    def to_dict(self):
        return {
            "_id": str(self._id),
            "name": self.name,
            "supervisor_id": str(self.supervisor_id),
            "student_ids": [str(id) for id in self.student_ids]
        }

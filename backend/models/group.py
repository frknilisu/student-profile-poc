from bson import ObjectId

class Group:
    def __init__(self, supervisor_id, student_ids=None, _id=None):
        if _id:
            self._id = ObjectId(_id)
        self.supervisor_id = ObjectId(supervisor_id)
        self.student_ids = [ObjectId(id) for id in student_ids] if student_ids else []

    def to_dict(self):
        data = {
            "supervisor_id": str(self.supervisor_id),
            "student_ids": [str(id) for id in self.student_ids]
        }
        if hasattr(self, '_id') and self._id:
            data["_id"] = str(self._id)
        return data

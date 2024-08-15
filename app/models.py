# app/models.py
class Student:
    def __init__(self, name, surname, grade, school, birtday, age, mobile_number):
        self.name = name
        self.surname = surname
        self.grade = grade
        self.school = school
        self.birtday = birtday
        self.age = age
        self.mobile_number = mobile_number

    def to_dict(self):
        return {
            "name": self.name,
            "surname": self.surname,
            "grade": self.grade,
            "school": self.school,
            "birtday": self.birtday,
            "age": self.age,
            "mobile_number": self.mobile_number
        }
    
    @classmethod
    def from_dict(cls, data):
        return cls(
            name=data.get("name"),
            surname=data.get("surname"),
            grade=data.get("grade"),
            school=data.get("school"),
            birtday=data.get("birtday"),
            age=data.get("age"),
            mobile_number=data.get("mobile_number")
        )

from datetime import datetime
from bson import ObjectId

class WeeklyRecord:
    def __init__(self, quran=0, risale=0, pirlanta=0, diger_kitap=0, kaset=0, cevsan=0, teheccud=0, oruc=0, ezber=0, vakit_namaz=0, date=None, _id=None):
        if _id:
            self._id = ObjectId(_id)
        self.quran = quran
        self.risale = risale
        self.pirlanta = pirlanta
        self.diger_kitap = diger_kitap
        self.kaset = kaset
        self.cevsan = cevsan
        self.teheccud = teheccud
        self.oruc = oruc
        self.ezber = ezber
        self.vakit_namaz = vakit_namaz
        self.date = date if date else datetime.now().strftime("%Y-%m-%d")

    def to_dict(self):
        data = {
            "quran": self.quran,
            "risale": self.risale,
            "pirlanta": self.pirlanta,
            "diger_kitap": self.diger_kitap,
            "kaset": self.kaset,
            "cevsan": self.cevsan,
            "teheccud": self.teheccud,
            "oruc": self.oruc,
            "ezber": self.ezber,
            "vakit_namaz": self.vakit_namaz,
            "date": self.date
        }
        if hasattr(self, '_id') and self._id:
            data["_id"] = str(self._id)
        return data

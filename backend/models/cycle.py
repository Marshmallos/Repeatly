from models import db


class Cycle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    start_date = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f"<Cycle({self.name})>"

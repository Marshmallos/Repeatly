from models import db


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    cycle_id = db.Column(db.Integer, db.ForeignKey("cycle.id", ondelete="CASCADE"))
    tasks = db.relationship("Task", backref="Activity", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Activity({self.name})>"

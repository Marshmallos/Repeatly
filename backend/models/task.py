from models import db


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    activity_id = db.Column(
        db.Integer, db.ForeignKey("activity.id", ondelete="CASCADE")
    )
    cycle_id = db.Column(db.Integer, db.ForeignKey("cycle.id", ondelete="CASCADE"))

    def __repr__(self):
        return f"<Task({self.name})>"

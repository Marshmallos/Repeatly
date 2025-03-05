from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from models import db

class Cycle(db.Model):
    # __tablename__ = "cycles"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    start_date = Column(Date, nullable=False)
    duration = Column(Integer, nullable=False)
    description = Column(String(500), nullable=True)

    # Relationships (e.g., activities, tasks) can be added here later

    def to_dict(self):
        """Convert model data to a dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "start_date": self.start_date.strftime('%Y-%m-%d'),
            "duration": self.duration,
            "description": self.description,
        }

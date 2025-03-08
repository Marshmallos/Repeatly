from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from models.user import User
from models.cycle import Cycle
from models.activity import Activity

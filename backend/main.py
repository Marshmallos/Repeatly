import os
from flask import Flask
from flask_migrate import Migrate
from backend.config import settings
from backend.models import db, User


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(SECRET_KEY=settings.SECRET_KEY)
    app.config["SQLALCHEMY_DATABASE_URI"] = settings.DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    from backend.routes import api

    app.register_blueprint(api)

    return app


app = create_app()
migrate = Migrate(app, db)


if __name__ == "__main__":
    app.run(host=settings.HOST, port=settings.PORT)

import os
import sys
from flask import Flask
from flask_migrate import Migrate, upgrade
from config import settings
from extension import ma
from models import db


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=settings.SECRET_KEY,
        SQLALCHEMY_DATABASE_URI=settings.DATABASE_URI,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    db.init_app(app)
    ma.init_app(app)

    from routes import api

    app.register_blueprint(api)

    return app


def run_db_init():
    from flask_migrate import init

    # Initialize the migration repository
    with app.app_context():
        init()
    print("Database migration repository initialized.")


def run_db_migrate():
    from flask_migrate import migrate

    with app.app_context():
        migrate()
    print("Database migration script created.")


def run_db_upgrade():
    with app.app_context():
        upgrade()
        print("Database upgraded to the latest version.")


app = create_app()
migrate = Migrate(app, db)

if __name__ == "__main__":
    if len(sys.argv) > 2:
        command = sys.argv[1] + " " + sys.argv[2]
        if command == "db init":
            run_db_init()
        elif command == "db migrate":
            run_db_migrate()
        elif command == "db upgrade":
            run_db_upgrade()
        else:
            print(f"Unknown command: {command}")
    else:
        app.run(host=settings.HOST, port=settings.PORT, debug=settings.DEBUG_MODE)

import os
import sys
from flask import Flask
from flask_cors import CORS
from config import settings
from extension import ma
from models import db
from logging_config import setup_logging
from error_handlers import register_error_handlers
from flask_migrate import Migrate
from migrate_db import run_db_init, run_db_migrate, run_db_upgrade


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY=settings.SECRET_KEY,
        SQLALCHEMY_DATABASE_URI=settings.DATABASE_URI,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    CORS(app)
    db.init_app(app)
    ma.init_app(app)

    # set up logging
    setup_logging()

    # register error handlers
    register_error_handlers(app)

    from routes import api

    app.register_blueprint(api)

    return app


app = create_app()
migrate = Migrate(app, db)

if __name__ == "__main__":
    if len(sys.argv) > 2:
        command = sys.argv[1] + " " + sys.argv[2]
        if command == "db init":
            run_db_init(app)
        elif command == "db migrate":
            run_db_migrate(app)
        elif command == "db upgrade":
            run_db_upgrade(app)
        else:
            print(f"Unknown command: {command}")
    else:
        app.run(host=settings.HOST, port=settings.PORT, debug=settings.DEBUG_MODE)

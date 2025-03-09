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

# Import route blueprints
from routes import api


def create_app():
    """Flask application factory."""
    app = Flask(__name__)

    # App configuration
    app.config.from_mapping(
        SECRET_KEY=settings.SECRET_KEY,
        SQLALCHEMY_DATABASE_URI=settings.DATABASE_URI,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    # Enable CORS (Cross-Origin Resource Sharing)
    CORS(app, supports_credentials=True)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)

    # Set up logging
    setup_logging()

    # Register error handlers
    register_error_handlers(app)

    # Register API blueprints
    app.register_blueprint(api)  # Existing API routes

    return app


# Create app instance
app = create_app()

# Set up Flask-Migrate for database migrations
migrate = Migrate(app, db)

if __name__ == "__main__":
    if len(sys.argv) > 2:
        command = sys.argv[1] + " " + sys.argv[2]
        if command == "db init":
            run_db_init(app)
        elif command == "db migrate":
            if len(sys.argv) != 4:
                print("Usage: db migrate 'message'")
                exit()
            message = sys.argv[3]
            run_db_migrate(app, message)
        elif command == "db upgrade":
            run_db_upgrade(app)
        else:
            print(f"Unknown command: {command}")
    else:
        # Start Flask app
        app.run(host=settings.HOST, port=settings.PORT, debug=settings.DEBUG_MODE)

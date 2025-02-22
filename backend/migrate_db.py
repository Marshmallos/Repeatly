from flask_migrate import upgrade, migrate, init


def run_db_init(app):
    # Initialize the migration repository
    with app.app_context():
        init()
    print("Database migration repository initialized.")


def run_db_migrate(app):
    with app.app_context():
        migrate()
    print("Database migration script created.")


def run_db_upgrade(app):
    with app.app_context():
        upgrade()
        print("Database upgraded to the latest version.")

from flask import Blueprint, jsonify

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/", methods=["GET"])
def root():
    return jsonify({"status": "ok", "data": "Welcome to repeatly backend!"}), 200


from routes.users import users_bp
from routes.auth import authenticate
from routes.cycle import cycle_bp
from routes.activities import activities_bp
from routes.tasks import tasks_bp

# register routes to prefix all url with /api/route
api.register_blueprint(users_bp)
api.register_blueprint(authenticate)
api.register_blueprint(cycle_bp)
api.register_blueprint(activities_bp)
api.register_blueprint(tasks_bp)

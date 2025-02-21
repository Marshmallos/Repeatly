from flask import Blueprint, jsonify

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/", methods=["GET"])
def root():
    return jsonify({"status": "ok", "data": "Welcome to repeatly backend!"}), 200


from routes.user import users

api.register_blueprint(users)

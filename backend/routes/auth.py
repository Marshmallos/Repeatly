from flask import Blueprint, jsonify, request

authenticate = Blueprint("authenticate", __name__, url_prefix="/auth")


@authenticate.route("/", methods=["POST"])
def authenticate_user():
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    print(username, " ", password)
    return jsonify({"status": "ok", "data": "Authenticated"}), 200

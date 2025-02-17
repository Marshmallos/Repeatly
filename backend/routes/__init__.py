from flask import Blueprint, jsonify

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/")
def root():
    return jsonify({"success": True, "data": "Welcome to repeatly backend!"})

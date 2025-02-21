from flask import Blueprint, jsonify, request
from models import db, User
from schemas.userSchema import user_schema, users_schema

users = Blueprint("user", __name__, url_prefix="/users")


@users.route("/")
def user_list():
    users = db.session.scalars(db.select(User).order_by(User.id)).all()
    return jsonify({"status": "ok", "data": users_schema.dump(users)}), 200


@users.route("/user-by-id/<int:id>")
def user_detail(id):
    user = db.get_or_404(User, id)
    return jsonify({"status": "ok", "data": user_schema.dump(user)}), 200


@users.route("/create", methods=["POST"])
def user_create():
    try:
        user = User(**request.get_json())
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        return jsonify({"status": "error", "data": str(e)}), 400
    return jsonify({"status": "ok", "data": "Successfully created"}), 200

from flask import Blueprint, jsonify, request, abort
from models import db, User
from werkzeug.security import generate_password_hash
from schemas.userSchema import user_schema, users_schema

users_bp = Blueprint("users", __name__, url_prefix="/users")


@users_bp.route("/")
def all_users():
    users = db.session.scalars(db.select(User).order_by(User.id)).all()
    return jsonify({"status": "ok", "message": users_schema.dump(users)}), 200


@users_bp.route("/<int:id>")
def get_user(id):
    user = db.get_or_404(User, id, description="User could not be found")
    return jsonify({"status": "ok", "message": user_schema.dump(user)}), 200


@users_bp.route("/create", methods=["POST"])
def create_user():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        existing_user = (
            db.session.execute(db.select(User).filter_by(username=username))
            .scalars()
            .first()
        )

        if existing_user:
            abort(409, description="Conflict: user already exists")

        data["password"] = generate_password_hash(password)
        data["password_hash"] = data.pop("password")
        user = User(**data)
        db.session.add(user)
        db.session.commit()

        return (
            jsonify(
                {
                    "status": "ok",
                    "message": "Successfully created",
                    "data": user_schema.dump(user),
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()  # Rollback changes if an error occurs
        abort(500, description=str(e))

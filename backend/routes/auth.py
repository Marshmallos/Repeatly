from flask import Blueprint, jsonify, request, abort
from models import db, User
from werkzeug.security import check_password_hash

authenticate = Blueprint("authenticate", __name__, url_prefix="/auth")


@authenticate.route("/", methods=["POST"])
def authenticate_user():

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = db.one_or_404(
        db.select(User).filter_by(username=username), description="User does not exists"
    )
    if not check_password_hash(user.password_hash, password):
        abort(401, description="Invalid username or password")
    return (
        jsonify(
            {
                "status": "ok",
                "message": "Authenticated",
                "data": {"username": user.username, "email": user.email},
            }
        ),
        200,
    )

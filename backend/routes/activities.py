from models import db, Activity
from schemas.activitySchema import activity_Schema, activities_Schema
from flask import Blueprint, jsonify, request, abort

activities_bp = Blueprint("activities", __name__, url_prefix="/activities")


@activities_bp.route("/", methods=["GET"])
def all_activities():
    activities = db.session.scalars(db.select(Activity).order_by(Activity.id)).all()
    return (
        jsonify(
            {
                "status": "ok",
                "message": "successfully retrieved activities",
                "data": activities_Schema.dump(activities),
            }
        ),
        200,
    )


@activities_bp.route("/<int:id>", methods=["GET"])
def get_activity(id):
    activity = db.get_or_404(Activity, id, description="Activity not found")
    return (
        jsonify(
            {
                "status": "ok",
                "message": "Successfully retrieved",
                "data": activity_Schema.dump(activity),
            }
        ),
        200,
    )


@activities_bp.route("/create", methods=["POST"])
def create_activity():
    try:
        data = request.get_json()
        name = data["name"]
        existing_activity = (
            db.session.execute(db.select(Activity).filter_by(name=name))
            .scalars()
            .first()
        )

        if existing_activity:
            abort(409, description="Conflict: activity already exists")
        activity = Activity(**data)
        db.session.add(activity)
        db.session.commit()

        return jsonify({"status": "ok", "message": "Activity succesfully created"}), 201
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))


@activities_bp.route("/<int:id>", methods=["DELETE"])
def delete_activity(id):
    try:
        activity = db.get_or_404(Activity, id, description="Activity does not exist")
        db.session.delete(activity)
        db.session.commit()
        return "", 204
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))

from flask import Blueprint, request, jsonify, abort
from models import db, Cycle
from schemas.cycleSchema import cycle_schema, cycles_schema, cycle_activity_schema
from datetime import datetime

cycle_bp = Blueprint("cycle", __name__, url_prefix="/cycle")


# Get all cycles
@cycle_bp.route("/", methods=["GET"])
def get_cycles():
    cycles = db.session.scalars(db.select(Cycle).order_by(Cycle.id)).all()
    return jsonify({"status": "ok", "message": cycles_schema.dump(cycles)}), 200


# Get a single cycle by ID
@cycle_bp.route("/<int:cycle_id>", methods=["GET"])
def get_cycle(cycle_id):
    cycle = db.get_or_404(Cycle, cycle_id, description="Cycle could not be found")
    return (
        jsonify(
            {
                "status": "ok",
                "message": "Data retrieved successfully",
                "data": cycle_activity_schema.dump(cycle),
            }
        ),
        200,
    )


# Create a new cycle
@cycle_bp.route("/create", methods=["POST"])
def create_cycle():
    try:
        data = request.get_json()
        name = data.get("name")
        date_str = data.get("start_date")

        existing_cycle = (
            db.session.execute(db.select(Cycle).filter_by(name=name)).scalars().first()
        )

        if existing_cycle:
            abort(409, description="Conflict: cycle already exists")
        data["start_date"] = datetime.strptime(date_str, "%d-%m-%Y").date()
        cycle = Cycle(**data)
        db.session.add(cycle)
        db.session.commit()

        return (
            jsonify(
                {
                    "status": "ok",
                    "message": "Successfully created",
                    "data": cycle_schema.dump(cycle),
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()  # Rollback changes if an error occurs
        abort(500, description=str(e))


# Delete a cycle
@cycle_bp.route("/<int:cycle_id>", methods=["DELETE"])
def delete_cycle(cycle_id):
    try:
        cycle = db.get_or_404(Cycle, cycle_id, description="Cycle does not exist")
        db.session.delete(cycle)
        db.session.commit()
        return "", 204
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))

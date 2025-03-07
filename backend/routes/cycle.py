from flask import Blueprint, request, jsonify, abort
from models import db, Cycle
from schemas.cycleSchema import cycle_schema, cycles_schema
from datetime import date

cycle_bp = Blueprint("cycle", __name__, url_prefix="/cycle")


# Get all cycles
@cycle_bp.route("/", methods=["GET"])
def get_cycles():
    cycles = db.session.scalars(db.select(Cycle).order_by(Cycle.id)).all()
    return jsonify({"status": "ok", "message": cycles_schema.dump(cycles)}), 200


# Get a single cycle by ID
@cycle_bp.route("/<int:cycle_id>", methods=["GET"])
def get_cycle(cycle_id):
    cycle = db.get_or_404(Cycle, id, description="Cycle could not be found")
    return jsonify({"status": "ok", "message": cycle_schema.dump(cycle)}), 200


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
        data["start_date"] = date(date_str)
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
@cycle_bp.route("/delete/<int:cycle_id>", methods=["DELETE"])
def delete_cycle(cycle_id):
    cycle = Cycle.query.get(cycle_id)
    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404

    db.session.delete(cycle)
    db.session.commit()
    return jsonify({"message": "Cycle deleted successfully"}), 200

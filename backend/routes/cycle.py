from flask import Blueprint, request, jsonify
from extension import db
from models.cycle import Cycle
from schemas.cycleSchema import CycleSchema
from datetime import datetime

cycle_bp = Blueprint("cycle", __name__, url_prefix="/api/cycles")

# Get all cycles
@cycle_bp.route("/", methods=["GET"])
def get_cycles():
    cycles = Cycle.query.all()
    return jsonify({"cycles": [cycle.to_dict() for cycle in cycles]})

# Get a single cycle by ID
@cycle_bp.route("/<int:cycle_id>", methods=["GET"])
def get_cycle(cycle_id):
    cycle = Cycle.query.get(cycle_id)
    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404
    return jsonify(cycle.to_dict())

# Create a new cycle
@cycle_bp.route("/create", methods=["POST"])
def create_cycle():
    data = request.json
    try:
        validated_data = CycleSchema(**data)
        new_cycle = Cycle(
            name=validated_data.name,
            start_date=datetime.strptime(str(validated_data.start_date), '%Y/%m/%d'),
            duration=validated_data.duration,
            description=validated_data.description,
        )
        db.session.add(new_cycle)
        db.session.commit()
        return jsonify({"message": "Cycle created successfully", "cycle": new_cycle.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Delete a cycle
@cycle_bp.route("/delete/<int:cycle_id>", methods=["DELETE"])
def delete_cycle(cycle_id):
    cycle = Cycle.query.get(cycle_id)
    if not cycle:
        return jsonify({"error": "Cycle not found"}), 404

    db.session.delete(cycle)
    db.session.commit()
    return jsonify({"message": "Cycle deleted successfully"}), 200

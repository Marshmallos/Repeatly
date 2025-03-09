from flask import Blueprint, jsonify, request, abort
from models import db, Task
from schemas.taskSchema import task_schema, tasks_schema

tasks_bp = Blueprint("tasks", __name__, url_prefix="/tasks")


@tasks_bp.route("/", methods=["GET"])
def all_tasks():
    tasks = db.session.scalars(db.select(Task).order_by(Task.id)).all()
    return (
        jsonify(
            {
                "status": "ok",
                "message": "Succesfully retrieved",
                "data": tasks_schema.dump(tasks),
            }
        ),
        200,
    )


@tasks_bp.route("/<int:id>", methods=["GET"])
def get_task(id):
    task = db.get_or_404(Task, id, description="Task does not exist")
    return (
        jsonify(
            {
                "status": "ok",
                "message": "Successfully retrieved data",
                "data": task_schema.dump(task),
            }
        ),
        200,
    )


@tasks_bp.route("/create", methods=["POST"])
def create_task():
    try:
        data = request.get_json()
        name = data.get("name")

        existing_task = (
            db.session.execute(db.select(Task).filter_by(name=name)).scalars().first()
        )

        if existing_task:
            abort(409, description="Conflict: Task already exists")

        task = Task(**data)
        db.session.add(task)
        db.session.commit()
        return (
            jsonify(
                {
                    "status": "ok",
                    "message": "Task created successfully",
                    "data": task_schema.dump(task),
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))


@tasks_bp.route("/<int:id>", methods=["DELETE"])
def delete_task(id):
    try:
        task = db.get_or_404(Task, id, description="Task does not exist")
        db.session.delete(task)
        db.session.commit()
        return "", 204
    except Exception as e:
        db.session.rollback()
        abort(500, description=str(e))

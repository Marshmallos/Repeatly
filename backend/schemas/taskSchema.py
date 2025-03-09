from extension import ma
from models import Task


class TaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Task


task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)

from extension import ma
from models import Activity
from marshmallow import fields
from schemas.taskSchema import TaskSchema


class ActivitySchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Activity
        include_relationships = True


class ActivityTaskSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Activity

    tasks = fields.List(fields.Nested(TaskSchema))


activity_schema = ActivitySchema()
activities_schema = ActivitySchema(many=True)
activity_tasks_schema = ActivityTaskSchema()

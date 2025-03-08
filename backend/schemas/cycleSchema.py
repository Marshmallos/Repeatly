from extension import ma
from models import Cycle

from marshmallow import fields
from schemas.activitySchema import ActivityTaskSchema
from schemas.taskSchema import TaskSchema


class CycleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cycle


class CycleActivitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cycle
        include_relationships = True
        load_instance = True

    activities = fields.List(fields.Nested(ActivityTaskSchema))
    tasks = fields.List(fields.Nested(TaskSchema))


cycle_schema = CycleSchema()
cycles_schema = CycleSchema(many=True)
cycle_activity_schema = CycleActivitySchema()

from extension import ma
from models import Cycle


class CycleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cycle


cycle_schema = CycleSchema()
cycles_schema = CycleSchema(many=True)

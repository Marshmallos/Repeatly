from extension import ma
from models import Activity


class ActivitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Activity


activity_Schema = ActivitySchema()
activities_Schema = ActivitySchema(many=True)

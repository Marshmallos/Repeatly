from extension import ma
from models import User


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        exclude = ["password_hash"]


user_schema = UserSchema()
users_schema = UserSchema(many=True)

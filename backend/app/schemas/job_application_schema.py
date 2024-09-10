from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields, validate
from app.models.job_application import JobApplication
from app import db


class JobApplicationSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = JobApplication
        load_instance = True
        sqla_session = db.session

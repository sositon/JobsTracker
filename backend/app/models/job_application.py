from datetime import datetime
from app import db


class JobApplication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    job_description = db.Column(db.Text)
    company_name = db.Column(db.String(100), nullable=False)
    company_location = db.Column(db.String(100))
    application_date = db.Column(db.Date, nullable=False)
    application_method = db.Column(db.String(50))
    application_status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # relationship
    user = db.relationship('User', back_populates='job_applications')


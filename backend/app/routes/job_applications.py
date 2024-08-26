from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.job_application import JobApplication
from app import db

bp = Blueprint('job_applications', __name__, url_prefix='/api/v1/job-applications')

@bp.route('', methods=['GET'])
@jwt_required()
def get_job_applications():
    current_user_id = get_jwt_identity()
    job_applications = JobApplication.query.filter_by(user_id=current_user_id).all()
    return jsonify([{
        'id': ja.id,
        'job_title': ja.job_title,
        'company_name': ja.company_name,
        'application_date': ja.application_date.isoformat(),
        'application_status': ja.application_status
    } for ja in job_applications]), 200

@bp.route('', methods=['POST'])
@jwt_required()
def create_job_application():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    new_application = JobApplication(user_id=current_user_id, **data)
    db.session.add(new_application)
    db.session.commit()
    return jsonify({
        'id': new_application.id,
        'job_title': new_application.job_title,
        'company_name': new_application.company_name,
        'application_date': new_application.application_date.isoformat(),
        'application_status': new_application.application_status
    }), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_job_application(id):
    current_user_id = get_jwt_identity()
    job_application = JobApplication.query.filter_by(id=id, user_id=current_user_id).first()
    if not job_application:
        return jsonify({"msg": "Job application not found"}), 404
    data = request.get_json()
    for key, value in data.items():
        setattr(job_application, key, value)
    db.session.commit()
    return jsonify({
        'id': job_application.id,
        'job_title': job_application.job_title,
        'company_name': job_application.company_name,
        'application_date': job_application.application_date.isoformat(),
        'application_status': job_application.application_status
    }), 200

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_job_application(id):
    current_user_id = get_jwt_identity()
    job_application = JobApplication.query.filter_by(id=id, user_id=current_user_id).first()
    if not job_application:
        return jsonify({"msg": "Job application not found"}), 404
    db.session.delete(job_application)
    db.session.commit()
    return jsonify({"msg": "Job application deleted successfully"}), 200
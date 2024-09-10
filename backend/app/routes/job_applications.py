from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.job_application import JobApplication
from app.schemas.job_application_schema import JobApplicationSchema
from app import db

bp = Blueprint('job_applications', __name__, url_prefix='/api/v1/job-applications')

job_application_schema = JobApplicationSchema(session=db.session)
job_applications_schema = JobApplicationSchema(many=True, session=db.session)


@bp.route('', methods=['GET'])
@jwt_required()
def get_job_applications():
    current_user_id = get_jwt_identity()
    job_applications = JobApplication.query.filter_by(user_id=current_user_id).all()
    return jsonify(job_applications_schema.dump(job_applications)), 200


@bp.route('', methods=['POST'])
@jwt_required()
def create_job_application():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    print(data)
    try:
        new_application = job_application_schema.load(data, session=db.session)
        new_application.user_id = current_user_id
        print(new_application)
        db.session.add(new_application)
        db.session.commit()
        return jsonify(job_application_schema.dump(new_application)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error creating job application", "error": str(e)}), 400


@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_job_application(id):
    current_user_id = get_jwt_identity()
    job_application = JobApplication.query.filter_by(id=id, user_id=current_user_id).first()
    if not job_application:
        return jsonify({"msg": "Job application not found"}), 404
    data = request.get_json()
    try:
        job_application = job_application_schema.load(data, instance=job_application, partial=True, session=db.session)
        db.session.commit()
        return jsonify(job_application_schema.dump(job_application)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error updating job application", "error": str(e)}), 400


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

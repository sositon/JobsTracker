from flask import Blueprint, request, jsonify
from flask_jwt_extended import set_access_cookies, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
from app.models.user import User
from app import db

bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')


@bp.route('/', methods=['GET'])
def test():
    return jsonify({"msg": "Hello, World!"}), 200


@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # check if user_name already exists
    if User.query.filter_by(user_name=data['user_name']).first():
        return jsonify({"msg": "User name already exists"}), 400
    # create new user
    user = User(user_name=data['user_name'], email=data['email'])
    user.set_password(data['password'])
    # save user to database
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Register successful!"}), 201


@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        response = jsonify({"msg": "Login successful!"})
        set_access_cookies(response, access_token)
        return response, 200

    return jsonify({"msg": "Invalid email or password"}), 401


# logout route
@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"msg": "Logout successful!"})
    unset_jwt_cookies(response)
    return response, 200


@bp.route('/me', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(id=user.id, email=user.email), 200
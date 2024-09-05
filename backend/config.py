import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = 'postgresql://omersiton:gkWFDGnf.s6Lr$u@localhost:5432/jobstracker'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_TOKEN_LOCATION = ["headers", "cookies"]
    # Enable CSRF protection for JWT stored in cookies
    JWT_COOKIE_CSRF_PROTECT = True
    # Name of the access token cookie (default is `access_token_cookie`)
    JWT_ACCESS_COOKIE_NAME = 'access_token_cookie'
    # Name of the CSRF token cookie (default is `csrf_access_token`)
    JWT_ACCESS_CSRF_COOKIE_NAME = 'csrf_access_token'
    # Set the cookie as HttpOnly to prevent JavaScript access (optional but recommended for security)
    JWT_COOKIE_HTTPONLY = True
    JWT_SECRET_KEY = 'dlkfngldsnrgkansrgans;rgjpaerjgojeorignjsbdfljbs;GN;werg;iebRGI'
    JWT_EXPIRATION_DELTA = 3600
    CORS_HEADERS = 'Content-Type'

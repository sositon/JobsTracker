import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = 'postgresql://omersiton:gkWFDGnf.s6Lr$u@localhost:5432/jobstracker'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'dlkfngldsnrgkansrgans;rgjpaerjgojeorignjsbdfljbs;GN;werg;iebRGI'
    JWT_EXPIRATION_DELTA = 3600
    CORS_HEADERS = 'Content-Type'

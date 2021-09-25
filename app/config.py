from logging import DEBUG
import os


class Config(object):
    FLASK_ENV = 'development'
    DEBUG = False
    TESTING = False

    SECRET_KEY = 'f\xdc\x0fK\xcb1\xe5\xc1Q\x8c\x84.' #random key -- os.urandom(12) 

class ProductionConfig(Config):
    FLASK_ENV = 'production'


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True









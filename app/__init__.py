from flask import Flask

from app.config import Config
from app.views.main.routes import main
from app.views.errors.handlers import errors
#from app.views.statistics.routes import blueprint_statistics
from app.views.about.routes import blueprint_about
from app.views.charts.routes import blueprint_charts
from app.views.tables.routes import blueprint_tables
from app.views.controller.routes import blueprint_controller
from app.extensions import cache


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    register_extensions(app)
    register_blueprints(app)

    return app

def register_blueprints(app):
    app.register_blueprint(main)
    app.register_blueprint(errors)
   # app.register_blueprint(blueprint_statistics)
    app.register_blueprint(blueprint_about)
    app.register_blueprint(blueprint_charts)
    app.register_blueprint(blueprint_tables)
    app.register_blueprint(blueprint_controller)

def register_extensions(app):
    cache.init_app(app, config={"CACHE_TYPE": "simple"})
    return None




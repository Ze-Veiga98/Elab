from flask import Blueprint, render_template
import requests
import os


blueprint_controller = Blueprint("controller", __name__, url_prefix="/controller", static_folder="../static")



@blueprint_controller.route("/controller")

def controller():
    return render_template('controller/controller.html')







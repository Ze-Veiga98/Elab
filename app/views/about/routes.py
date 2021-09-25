from flask import Blueprint, render_template
from app.extensions import cache
import requests
import os

blueprint_about = Blueprint("about", __name__, url_prefix="/about", static_folder="../static")

@blueprint_about.route('/')
@cache.cached(timeout=3600, key_prefix="about")
def about():
    return render_template("about/about.html")
from flask import Blueprint, render_template
import requests
import os


blueprint_charts = Blueprint("charts", __name__, url_prefix="/charts", static_folder="../static")



@blueprint_charts.route("/velocidade")
def velocidade_linear():
    # Renders a page with the chart of velocity as a function of sampling. 
    return render_template('charts/velocidade_linear.html')


@blueprint_charts.route('/periodo_histogram')
def periodo_histogram():
    return render_template('charts/periodo_histograma.html')
    

@blueprint_charts.route('/temperature')
def temperature():
    return render_template('charts/temperature.html')





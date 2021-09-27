from flask import Blueprint, render_template, request
import requests
import os

from app.views.main.main import *

"""
### Pa .não sei se vou fazer o user. LACK OF TIME
Blueprints: Are a way to organize our project. So to put it simpler, is a means to organize our project in folders 
In python each folder is a module.
The blueprint that i plain to implement in this app are:
   main_blueprint: will be resposible for displaying different views of the main website
   errors_blueprint: display views for errors managing
   users_blueprint: Will be responsible for logging in/out for/from our webpage, password resets, e-mail confirmations

Each of these blupeints will have their own set of templates
"""

###################
# public blueprint #
###################

main = Blueprint('main', __name__)

@main.route("/", methods=['GET'])
def home():
    return render_template("base/base.html")


@main.route('/user', methods=['POST','OPTIONS'])
def Flask_f1():
    global i
    global frist
    frist =1
    i = 1
    if request.method == 'POST':
        #origin = request.headers.get('Origin')	
        print(request.data)
        user_json = json.loads(request.data.decode(FORMAT))
        ConfigureStartExperiment(user_json)
        return '' #jsonify({'JSON Enviado' : request.args.get('JSON'), 'result': 'OK!'})
    elif request.method == 'OPTIONS':
        return ''

        
@main.route('/resultpoint', methods=['GET'])
def getPoint():
    global end
    exp_data = receive_data_from_exp()
    send_data = {"msg_id" : "11",
                 "timestamp" : str(time.time_ns()),
                 "status" : "waiting", 
                 "Data" : " "}

    if exp_data == "DATA_END": #and end == 0:
        send_data =     {"msg_id":"11",
                        "timestamp": str(time.time_ns()),
                        "status":"Experiment Ended",
                        "Data":" "}
    else :
        send_data =     {"msg_id" : "11",
                        "timestamp" : str(time.time_ns()),
                        "status" : "running", 
                        "Data" : exp_data}
    print(send_data)
    return send_data












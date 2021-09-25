import json
from time import sleep
import random
import math 
import time
import logging

FORMAT = 'utf-8'
NAME_EXP = "Pendulo"
serial_port = None
Delta_x = None
n_points = None
frist = 1
i = 1
total_in = 0
error_x = 0.005


def receive_data_from_exp():
    global serial_port
    global frist 
    global i 
    global total_in
    if frist == 1:
        frist =0
        return "DATA_START"
    if int(i) > int(n_points): 
        sleep(0.01)
        return "DATA_END"

    else:
        sleep(0.5)

        x = 5.0 + float((random.randrange(-10,10)*3.0*float(error_x)))
        vel = Delta_x/x
        e_vel = math.sqrt((float(Delta_x)/(float(x)**2))**2*float(error_x)**2+(1/x)**2*0.005**2)
        temp = 28.00+ float(random.randrange(-1,1))
        
        pic_message =   {"Sample_number":str(i),
                        "period":str(x),
                        "e_period":str(error_x),
                        "velocity":str(vel),
                        "e_velocity":str(e_vel),
                        "temp":str(temp)}
        #print (pic_message)
        i=i+1
    return pic_message

def do_config(config_json) :
    global serial_port

    global Delta_x
    global n_points
    

    print(config_json)
    Delta_x = config_json["config_experiment"]["DeltaX"]
    n_points = config_json["config_experiment"]["Samples"]

    #print("Inicializando a experienica com os valores que me deram\n")
    print("Inicial X displacement: ")
    print(Delta_x)
    print('\n')
    print("Number of samples: ")
    print(n_points)

    return  config_json,True


def ConfigureStartExperiment(user_json):
    
    do_config(user_json)
    return ''


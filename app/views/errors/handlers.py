from flask import Flask, render_template, Blueprint, jsonify


####################################
# Blueprint for custom error pages #
####################################

errors = Blueprint('errors', __name__)


#--------------------#
# error handlers     #
#--------------------#
@errors.app_errorhandler(404)
def page_not_found(error):
    
    return render_template('errors/404.html')

@errors.errorhandler(405)
def api_error(error):
    response = jsonify({'status': 405, 'error': 'method not supported!', 'message': 'method is not supported'})
    response.status_code = 405
    return response

@errors.errorhandler(500)
def api_error(error):
    response = jsonify({'status': 500, 'error': 'internal server error!', 'message': 'internal server error occurred'})
    response.status_code = 500
    return response




   
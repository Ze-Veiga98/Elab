from app import create_app
from datetime import datetime

# Call the application factory fucntion to construct a Flask application 
app = create_app()

"""
def _jinja2_filter_datetime(date):
    return datetime.utcfromtimestamp(date / 1000).strftime('%d-%m-%Y')

app.jinja_env.filters['datetime'] = _jinja2_filter_datetime
"""


#start server
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True, threaded=True)









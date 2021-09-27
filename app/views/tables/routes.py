from flask import Flask, render_template, Blueprint

# Não faz sentido ter cache neste endpoint porque senão cada vez que o user submeter uma nova experiencia os dados iniciam onde a experiencia anterior tinha 
# terminado.
#from app.extensions import cache

blueprint_tables = Blueprint("tables", __name__, url_prefix="/tables", static_folder="../static")

@blueprint_tables.route("/")
#@cache.cached(timeout=3600, key_prefix="tables")
def tables():
    return render_template('tables/tables.html')

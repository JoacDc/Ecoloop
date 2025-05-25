from flask import Flask, render_template, request, jsonify
import random as rd
from src.Contenedor import Contenedor
from src.connection import getConnection

app = Flask(__name__)

contenedores = []

@app.route("/")
def mapa():
    return render_template("mapa.html")

@app.route('/crear_contenedor', methods=['POST'])
def crear_contenedor():
    data = request.get_json()
    
    nuevo_contenedor = Contenedor(
        id=rd.randint(100, 100000),
        nombre=data['nombre'],
        lat=float(data['latitud']),
        long=float(data['longitud']),
        color=data['color'],
        tamaño=float(data['tamanio']),
        tipoResiduo=data['tipoResiduo'],
        cantidadMax=100,  # Puedes hacer estos campos editables también
        cantidadMin=0
    )
    
    contenedores.append(nuevo_contenedor)
    print(f"Nuevo contenedor: {nuevo_contenedor}")  # Para depuración
    
    print("\n" + "="*50)
    print("📦 NUEVO CONTENEDOR CREADO:")
    print(f"ID: {nuevo_contenedor.id}")
    print(f"Nombre: {nuevo_contenedor.nombre}")
    print(f"Ubicación: Lat {nuevo_contenedor.lat}, Long {nuevo_contenedor.long}")
    print(f"Tipo: {nuevo_contenedor.tipoResiduo}")
    print("="*50 + "\n")

    return jsonify({
        "mensaje": f"Contenedor {nuevo_contenedor.id} creado con éxito",
        "data": data
    })

   
if __name__ == "__main__":
    app.run(debug=True)
#ABSTRACCION DE CONTENEDEROS
from app.Contenedor import Contenedor
from app.Ubicacion import obtener_ubicacion_ip
from test.pruebas import distancia
from app.connection import getConnection
from pprint import pprint
import random as rd

print("OBTENEIENDO UBICACION...")
lonUs, latUs = obtener_ubicacion_ip()
db = getConnection()
coleccion = db["Contenedores"]

if db is not None:
    coleccion = db["collection"]
    print("🚀 Listo para usar la colección.")
else:
    print("💥 No se pudo establecer conexión con la base de datos.")

contenedores = []
rd.seed()

salida = "1"
while salida != "0":
    id = rd.randint(100, 100000)
    nombre = input("Ingrese el nombre del contenedor: ")
    print("Coordenadas del contenedor")
    long = float(input("Longitud: "))
    lat = float(input("Latitud: "))
    color = input("Color del contenedor: ")
    tamaño = float(input("Volumen del contenedor (m^3): "))
    tipoResiduo = input("Tipo de Residuo: ")
    cantidadMax = int(input("Cantidad Máxima: "))
    cantidadMin = int(input("Cantidad Mínima: "))

    contenedor = Contenedor(id, nombre, lat, long, color, tamaño, tipoResiduo, cantidadMax, cantidadMin)
    contenedores.append(contenedor)

    print("Ingrese cero (0) si desea salir")
    salida = input()

# Insertar en MongoDB
for cont in contenedores:
    coleccion.insert_one(cont.to_dict())
    print(f"✅ Contenedor '{cont.nombre}' guardado en MongoDB")

print("📦 Todos los contenedores fueron guardados.")    

distancia(lonUs, latUs, lat, long)







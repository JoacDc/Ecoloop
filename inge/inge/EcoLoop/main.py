#ABSTRACCION DE CONTENEDEROS
from Contenedor import Contenedor
from Ubicacion import obtener_ubicacion_ip
import pruebas
from connection import getConnection
from pprint import pprint

print("OBTENEIENDO UBICACION...")
lonUs, latUs = obtener_ubicacion_ip()

db = getConnection()

collection = db["collection"]


#print(f"Latitud: {latUs} ; Lonigut: {lonUs}")

print("CARGA DE DATOS DE CONTENEDORES📦")

#lonUs, latUs = -29.16097982187876, -67.49468112447701

lonDes, latDes =  -29.139645720922722, -67.5298167636317


contenedor1 = Contenedor("Contenedor A", -29.142102, -67.529081, 'rojo', 45, 'plastico', 130, 50)
contenedor2 = Contenedor("Contenedor B", -34.6075, -58.3780, 'azul', 45, 'vidrio', 130, 50)
contenedor3 = Contenedor("Contenedor C", -34.6010, -58.3850, 'verde', 45, 'carton', 130, 50)

contenedores = []

contenedores.append(contenedor1)
contenedores.append(contenedor2)
contenedores.append(contenedor3)

print()

print("CONTENEDORES CARGADOS ✅")

print()
for cont in contenedores:
    print(cont.__str__())
print()

pruebas.distancia(latUs, lonUs, latDes, lonDes)

print("DOCUMENTOS TRAIDOS DE LA BASE DE DATOS....")

for doc in collection.find():
    pprint(doc)


import random as rd
from Contenedor import Contenedor
rd.seed()

contenedores = []
salida = "1"
while(salida!="0"):
    id = rd.randint(100,100000)
    nombre = input("Ingrese el nombre del contenedor: ")
    print("Coordenadas del conteiner")
    long = float(input("Longitud: "))
    lat = float(input("Latitud: "))
    color = input("Color del contenedor: ")
    tamaño = float(input("Ingrese el volumen del contenedor (m^3): "))
    tipoResiduo = input("Tipo de Residuo: ")
    cantidadMax = int(input("Cantidad Maxima: "))
    cantidadMin = int(input("Cantidad Minina: "))

    contenedor = Contenedor(id, nombre, lat, long, color, tamaño, tipoResiduo, cantidadMax, cantidadMin)

    contenedores.append(contenedor)

    print("Ingrese cero (0) si desea salir")
    salida = input()

for cont in contenedores:
    print(cont)
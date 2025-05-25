import openrouteservice

import requests

def distancia(latUs, lonUs, latDes, lonDes):
    # Crear cliente con tu API key gratuita
    client = openrouteservice.Client(key='5b3ce3597851110001cf6248cd8d7a16690c42f2943a22e867f7e58b')  # Conseguí tu key en https://openrouteservice.org/

    origen = (latUs, lonUs)
    destino = (latDes, lonDes)
    
    # Solicitud de ruta
    ruta = client.directions([origen, destino], profile='driving-car')

    # Distancia y duración
    distancia_metros = ruta['routes'][0]['summary']['distance']
    tiempo_segundos = ruta['routes'][0]['summary']['duration']

    print(f"Distancia real: {distancia_metros / 1000:.2f} km")
    print(f"Tiempo estimado: {tiempo_segundos / 60:.1f} minutos")

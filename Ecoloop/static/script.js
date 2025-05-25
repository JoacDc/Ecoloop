let marcadorActual = null;
let ultimaUbicacion = null;

function iniciarMap() {
    const coord = { lat: -29.16434370771048, lng: -67.49589881729844 };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: coord,
        mapTypeId: 'hybrid',
        styles: getEstilosConZoom(13)
    });

    const geocoder = new google.maps.Geocoder();
    const botonConfirmar = document.getElementById("confirmarUbicacion");

    map.addListener('click', function (event) {
        colocarUnicoMarcador(event.latLng, map);
        mostrarCoordenadas(event.latLng);
        obtenerDireccion(geocoder, event.latLng);
        ultimaUbicacion = event.latLng;

        // Habilitar el botón
        botonConfirmar.disabled = false;
    });

    map.addListener('zoom_changed', () => {
        const zoom = map.getZoom();
        map.setOptions({
            styles: getEstilosConZoom(zoom)
        });
    });

    // Acción al hacer clic en "Confirmar Nueva Ubicación"
    botonConfirmar.addEventListener('click', () => {
        if (ultimaUbicacion) {
            const lat = ultimaUbicacion.lat().toFixed(6);
            const lng = ultimaUbicacion.lng().toFixed(6);
            alert(`✅ Ubicación confirmada:\nLatitud: ${lat}\nLongitud: ${lng}`);
            // Acá podrías hacer una llamada a tu backend o guardar en localStorage
            // Por ejemplo:
            // localStorage.setItem('ubicacionConfirmada', JSON.stringify({lat, lng}));
        }
    });
}

function colocarUnicoMarcador(location, map) {
    if (marcadorActual) {
        marcadorActual.setMap(null);
    }

    marcadorActual = new google.maps.Marker({
        position: location,
        map: map,
        title: "Marcador único"
    });
}

function mostrarCoordenadas(latLng) {
    const lat = latLng.lat().toFixed(6);
    const lng = latLng.lng().toFixed(6);

    const contenedor = document.getElementById("coordenadas");
    contenedor.childNodes[0].textContent = `Latitud: ${lat} | Longitud: ${lng}`;
}

function obtenerDireccion(geocoder, latLng) {
    const direccionContenedor = document.getElementById("direccion");

    if (!direccionContenedor) {
        // Si el elemento #direccion no existe, lo creamos
        const nuevo = document.createElement("div");
        nuevo.id = "direccion";
        document.body.appendChild(nuevo);
    }

    geocoder.geocode({ location: latLng }, (results, status) => {
        const contenedor = document.getElementById("direccion");

        if (status === "OK") {
            if (results[0]) {
                contenedor.textContent = `📍 Dirección: ${results[0].formatted_address}`;
            } else {
                contenedor.textContent = "No se encontró dirección.";
            }
        } else {
            contenedor.textContent = "Error al obtener dirección.";
            console.error("Geocoder falló por: " + status);
        }
    });
}

function getEstilosConZoom(zoom) {
    return [
        {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }]
        },
        {
            featureType: "all",
            elementType: "labels.text",
            stylers: [
                {
                    weight: 0.5
                },
                {
                    visibility: "on"
                }
            ]
        },
        {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [
                {
                    visibility: "on"
                }
            ]
        }
    ];
}

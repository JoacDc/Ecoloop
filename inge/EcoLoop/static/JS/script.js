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
    const botonEnviar = document.getElementById("enviarTodo");

    map.addListener('click', function(event) {
        colocarUnicoMarcador(event.latLng, map);
        mostrarCoordenadas(event.latLng);
        obtenerDireccion(geocoder, event.latLng);
        ultimaUbicacion = event.latLng;
        
        // Habilitar el botón de enviar si todos los campos están completos
        if (validarFormulario()) {
            botonEnviar.disabled = false;
        }
    });

    // Validar formulario al cambiar cualquier campo
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            if (ultimaUbicacion && validarFormulario()) {
                botonEnviar.disabled = false;
            } else {
                botonEnviar.disabled = true;
            }
        });
    });

    // Enviar todo al backend
    botonEnviar.addEventListener('click', enviarDatos);
}

function validarFormulario() {
    return document.getElementById('nombre').value && 
           document.getElementById('color').value &&
           document.getElementById('tamanio').value &&
           document.getElementById('tipoResiduo').value;
}

function enviarDatos() {
    if (!ultimaUbicacion || !validarFormulario()) return;

    const datos = {
        nombre: document.getElementById('nombre').value,
        color: document.getElementById('color').value,
        tamanio: parseFloat(document.getElementById('tamanio').value),
        tipoResiduo: document.getElementById('tipoResiduo').value,
        latitud: ultimaUbicacion.lat().toFixed(6),
        longitud: ultimaUbicacion.lng().toFixed(6)
    };

    fetch('/crear_contenedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        alert(`✅ Contenedor creado: ${data.mensaje}`);
        // Opcional: resetear el formulario
        document.querySelector('form').reset();
        marcadorActual.setMap(null);
        document.getElementById('coordenadas').textContent = 'Latitud: — | Longitud: —';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('❌ Error al crear el contenedor');
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
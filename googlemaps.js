let savedCoordinates = null;

function initMap() {
    const arequipa = { lat: -16.4090474, lng: -71.537451 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: arequipa,
    });

    map.addListener("click", (event) => {
        savedCoordinates = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };

        document.getElementById("report-btn").disabled = false;
        new google.maps.Marker({
            position: savedCoordinates,
            map: map,
            title: `Coordenadas: ${savedCoordinates.lat}, ${savedCoordinates.lng}`,
        });
    });
}

document.getElementById("report-btn").addEventListener("click", () => {
    if (savedCoordinates) {
        const googleMapsLink = `https://www.google.com/maps?q=${savedCoordinates.lat},${savedCoordinates.lng}`;
        document.getElementById("ubicacion").value = googleMapsLink;
        document.getElementById("incidentForm").submit();
    }
});

document.getElementById("report-Local").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                document.getElementById("ubicacion").value = googleMapsLink;
                document.getElementById("incidentForm").submit();
            },
            () => {
                alert("No se pudo obtener la ubicación.");
            }
        );
    } else {
        alert("Geolocalización no soportada por el navegador.");
    }
});


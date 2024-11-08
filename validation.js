document.getElementById('incidentForm').addEventListener('submit', function(e) {
	let isValid = true

	const ubicacion = document.getElementById('ubicacion')
	const descripcion = document.getElementById('descripcion')
	const ubicacionError = document.getElementById('ubicacionError')
	const descripcionError = document.getElementById('descripcionError')

	if (!ubicacion.value.trim()) {
		ubicacionError.textContent = 'La ubicación es requerida'
		isValid = false
	} else {
		ubicacionError.textContent = ''
	}

	if (!descripcion.value.trim()) {
		descripcionError.textContent = 'La descripción es requerida'
		isValid = false
	} else {
		descripcionError.textContent = ''
	}

	if (!isValid) e.preventDefault()
})


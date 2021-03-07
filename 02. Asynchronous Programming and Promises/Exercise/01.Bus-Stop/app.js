async function getInfo () {
	const html = {
		stopName: document.getElementById(`stopName`),
		busses: document.getElementById(`buses`),
		stopID: document.getElementById(`stopId`)
	}

	html.stopName.innerHTML = ''
	html.busses.innerHTML = ''

	try {
		const data = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${html.stopID.value}/1`)
		if (! data.ok) throw new Error()
		const deserialized = await data.json()

		html.stopName.innerHTML = deserialized.name
		Object.entries(deserialized.buses).forEach(([bus, time]) => {
			const e = document.createElement('li')
			e.innerHTML = `Bus ${bus} arrives in ${time}`

			html.busses.appendChild(e)
		})

	} catch (e) {
		html.stopName.innerHTML = 'Error'
	}
}
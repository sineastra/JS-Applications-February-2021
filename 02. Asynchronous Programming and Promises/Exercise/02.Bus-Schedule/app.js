function solve () {
	const html = {
		info: document.getElementById(`info`),
		depart: document.getElementById(`depart`),
		arrive: document.getElementById(`arrive`),
	}

	const getStop = async (name) => {
		try {
			const stop = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${name}`)

			return await stop.json()
		} catch (e) {
			html.info.innerHTML = 'Error'
			html.arrive.disabled = true
			html.depart.disabled = true
		}
	}
	let nextStop
	let nextStopName = 'depot'


	async function depart () {
		html.depart.disabled = true
		html.arrive.disabled = false
		nextStop = await getStop(nextStopName)
		html.info.innerHTML = `Next stop ${nextStop.name}`
	}

	function arrive () {
		html.depart.disabled = false
		html.arrive.disabled = true

		html.info.innerHTML = `Arriving at ${nextStop.name}`
		nextStopName = nextStop.next
	}

	return {
		depart,
		arrive
	}
}

let result = solve()
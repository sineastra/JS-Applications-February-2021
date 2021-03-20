async function checkOkToJSON (response) {
	if (! response.ok) {
		throw new Error(response.status)
	}

	return await response.json()
}

async function getData () {
	const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown ')

	return await checkOkToJSON(response)
}

async function postEntry (entry) {
	const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown ', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(entry)
	})

	return await checkOkToJSON(response)
}

export { getData, postEntry }
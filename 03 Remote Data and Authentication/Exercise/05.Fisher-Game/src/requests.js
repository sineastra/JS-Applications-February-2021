const baseUrl = 'http://localhost:3030/data/catches'

async function getAllCatches () {
	const response = await fetch(baseUrl)

	return response.json()
}

async function createCatch (data) {
	const response = await fetch(baseUrl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		},
		body: JSON.stringify(data)
	})
	const returnedData = await response.json()

	console.log(returnedData)
}

async function updateCatch (id, data) {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		},
		body: JSON.stringify(data)
	})
	const returnedData = await response.json()

	console.log(returnedData)
}

async function deleteCatch (id) {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		}
	})
	const returnedData = await response.json()

	console.log(returnedData)
}

export { createCatch, updateCatch, deleteCatch, getAllCatches }
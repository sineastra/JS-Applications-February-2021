const request = async (url, options = {}) => {
	const response = await fetch(url, options)
	const result = response.json()

	return result
}

const createOptions = (method = 'GET', headers = {}, data = {}) => {
	return {
		method,
		headers: { ...{ 'Content-Type': 'application/json', }, ...headers },
		body: JSON.stringify(data)
	}
}

export { request, createOptions }


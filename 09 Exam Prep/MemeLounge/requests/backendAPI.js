const origin = 'http://localhost:3030'

const createOptions = (method = 'GET', body) => {
	const options = {
		method,
		headers: {},
	}
	const token = sessionStorage.getItem('accessToken')

	if (token) {
		options.headers['X-Authorization'] = token
	}
	if (body) {
		options.headers['Content-Type'] = 'application/json'
		options.body = JSON.stringify(body)
	}

	return options
}

const request = async (uri, options) => {
	const URI = uri[0] === '/' ? uri : `/${uri}`
	let response = {}

	try {
		response = await fetch(`${origin}${URI}`, options)
	} catch (e) {
		throw new Error(e)
	}

	if (! response.ok) {
		throw new Error(response.status)
	}

	try {
		return await response.json()
	} catch (e) {
		return response
	}
}

const fetches = {
	get: async (uri) => await request(uri, createOptions()),
	post: async (uri, body) => await request(uri, createOptions('POST', body)),
	put: async (uri, body) => await request(uri, createOptions('PUT', body)),
	delete: async (uri) => await request(uri, createOptions('DELETE')),
}

export { fetches }
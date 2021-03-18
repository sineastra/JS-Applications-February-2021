// BACKEND API FUNCTION


// generic fetch for local server backend api.
async function request (url, options) {
	const response = await fetch(url, options)

	if (! response.ok) {
		const error = await response.json()

		throw new Error(error.message)
	}

	return await response.json()
}
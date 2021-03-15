const baseUrl = 'http://localhost:3000'
const moviesUrl = `${baseUrl}/data/movies`

async function getMovies () {
	const response = await fetch(moviesUrl)

	return await response.json()
}

async function createMovie (data) {
	const response = await fetch(moviesUrl, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})

	return await response.json()
}

async function updateMovie (data, id) {
	const response = await fetch(`${moviesUrl}/${id}`, {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})

	return await response.json()
}

async function deleteMovie (id) {
	const response = await fetch(`${moviesUrl}/${id}`, {
		method: 'delete'
	})

	return await response.json()
}

async function getMovieLikesNumber (movieId) {
	const response = await fetch(`${baseUrl}/data/likes?where=movieId%3D%22{movieId}%22&distinct=_ownerId&count`)

	return await response.json()
}

async function getIfUserLikedMovie (movieId, userId) {
	const response = await fetch(`${baseUrl}/data/likes?where=movieId%3D%22{movieId}%22%20and%20_ownerId%3D%22{userId}%22`)

	return await response.json()
}

async function addLike (data) {
	const response = await fetch(`${baseUrl}/data/likes`, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})

	return await response.json()
}

async function removeLike (id) {
	const response = await fetch(`${baseUrl}/data/likes/${id}`, {
		method: 'delete',
	})

	return await response.json()
}
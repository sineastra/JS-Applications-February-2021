const baseUrl = 'http://localhost:3030'
const moviesUrl = `${baseUrl}/data/movies`

async function getMovies () {
	const response = await fetch(moviesUrl)

	return await response.json()
}

async function createMovie (data) {
	const response = await fetch(moviesUrl, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		},
		body: JSON.stringify(data)
	})
}

async function getMovieData (id) {
	const response = await fetch(`${moviesUrl}/${id}`)

	return response.json()
}

async function updateMovie (data, id) {
	const response = await fetch(`${moviesUrl}/${id}`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		},
		body: JSON.stringify(data)
	})

	return await response.json()
}

async function deleteMovie (id) {
	const response = await fetch(`${moviesUrl}/${id}`, {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		},
	})

	return await response.json()
}

async function getMovieLikesNumber (movieId) {
	const response = await fetch(`${baseUrl}/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`)

	return await response.json()
}

async function getIfUserLikedMovie (movieId, userId) {
	const response = await fetch(`${baseUrl}/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`)

	return await response.json()
}

async function addLike (data) {
	const response = await fetch(`${baseUrl}/data/likes`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		},
		body: JSON.stringify(data)
	})

	return await response.json()
}

async function removeLike (id) {
	const response = await fetch(`${baseUrl}/data/likes/${id}`, {
		method: 'delete',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		}
	})

	return await response.json()
}

async function login (url, data) {
	const response = await fetch(url, {
		method: 'post',
		'Content-Type': 'application/json',
		body: JSON.stringify(data)
	})

	if (response.ok) {
		const user = await response.json()

		sessionStorage.setItem('accessToken', user.accessToken)
		sessionStorage.setItem('_id', user._id)
		sessionStorage.setItem('email', user.email)

	}

	return response
}

async function logoutRequest () {
	const response = await fetch(`http://localhost:3030/users/logout`, {
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
			'X-Authorization': sessionStorage.getItem('accessToken')
		}
	})
}

const loginRequest = login.bind(undefined, `http://localhost:3030/users/login`)
const registerRequest = login.bind(undefined, `http://localhost:3030/users/register`)

export {
	getMovies,
	getMovieData,
	createMovie,
	updateMovie,
	deleteMovie,
	getMovieLikesNumber,
	getIfUserLikedMovie,
	addLike,
	removeLike,
	loginRequest,
	registerRequest,
	logoutRequest,
}
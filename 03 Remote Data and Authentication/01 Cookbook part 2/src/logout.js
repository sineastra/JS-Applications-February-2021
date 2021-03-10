async function logout () {
	await fetch('http://localhost:3030/users/logout', {
		method: 'get',
		headers: {
			'X-Authorization': sessionStorage.accessToken
		}
	})

	sessionStorage.clear()
}

export default logout
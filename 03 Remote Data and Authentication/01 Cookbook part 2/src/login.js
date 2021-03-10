import { deserializeFormData, redirect } from './helper.js'


async function login (url, data) {

	const response = await fetch(url, {
		method: 'post',
		'Content-Type': 'application/json',
		body: JSON.stringify(data)
	})

	if (response.ok) {
		console.log(response)
		const user = await response.json()

		sessionStorage.setItem('accessToken', user.accessToken)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('login').addEventListener('submit', async e => {
		e.preventDefault()
		const data = deserializeFormData(e.target)

		await login(`http://localhost:3030/users/login`, data)
		redirect('login.html', 'index.html')
	})
})

export { login }
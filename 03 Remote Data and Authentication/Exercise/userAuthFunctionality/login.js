import { deserializeFormData, redirect } from './helper.js'

async function login (url, data) {

	const response = await fetch(url, {
		method: 'post',
		'Content-Type': 'application/json',
		body: JSON.stringify(data)
	})

	if (response.ok) {
		const user = await response.json()
		console.log(user)

		sessionStorage.setItem('accessToken', user.accessToken)
		sessionStorage.setItem('_id', user._id)
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
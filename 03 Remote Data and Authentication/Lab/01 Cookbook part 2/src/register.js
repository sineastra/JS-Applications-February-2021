import { login } from './login.js'
import { displayMsg, deserializeFormData, redirect } from './helper.js'

function validateFields (data, output) {

	if (data.email === '' || data.password === '') {
		displayMsg(output, 'Email and Password must not be empty!')
		return false
	}
	if (data.password !== data.rePass) {
		displayMsg(output, 'Passwords do not match!')
		return false
	}

	return true
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('register').addEventListener('submit', async e => {
		e.preventDefault()
		const data = deserializeFormData(e.target)

		if (validateFields(data)) {
			await login(`http://localhost:3030/users/register`, data)
			redirect('register.html', 'index.html')
		}
	})
})

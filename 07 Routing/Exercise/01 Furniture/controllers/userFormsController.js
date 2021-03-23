import { user } from '../requests/requests.js'
import page from '//unpkg.com/page/page.mjs'
import { createFormObject } from '../src/helper.js'

const isValidInputData = (formObj) => {
	if (formObj.email === '' || formObj.password === '')
		return false
	if (formObj.rePass && (formObj.password !== formObj.rePass))
		return false

	return true
}

const saveUserInStorage = data => {
	sessionStorage.setItem('email', data.email)
	sessionStorage.setItem('id', data._id)
	sessionStorage.setItem('accessToken', data.accessToken)

	return data
}

const errors = (statusCode) => {
	const codes = {
		403: 'Invalid username and/or password',
		409: 'Username already taken'
	}

	return codes[statusCode]
}

const genericLogin = async (type, e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)

	if (isValidInputData(formObject)) {
		try {
			const response = await user[type]({
				email: formObject.email,
				password: formObject.password
			})

			saveUserInStorage(response)
		} catch (e) {
			alert(errors(e.message))
			return
		}

		page.redirect('/dashboard')
	}
}

const register = e => genericLogin('register', e)
const login = e => genericLogin('login', e)

export { register, login }
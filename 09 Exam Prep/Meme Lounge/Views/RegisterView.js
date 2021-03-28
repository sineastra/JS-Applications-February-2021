import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { createFormObject, showNotification } from '../src/helper.js'
import { user } from '../requests/requests.js'
import { saveUserInStorage } from '../src/helper.js'
import page from '../node_modules/page/page.mjs'
import { PageLayout } from '../Components/PageLayout.js'
import { LoginView } from './LoginView.js'
import { Notif } from '../Components/Notif.js'

const errors = {
	email: 'Email is required',
	username: 'Username is required',
	password: 'Password is required',
	repeatPass: 'Passwords do not match',
	409: 'Username already taken'
}

const checkForValidInput = (formObj) => { // ADD FIELDS IF NEOBHODIMO HOHO
	const checks = {
		email: (email) => email !== '',
		username: (username) => username !== '',
		password: (password) => password !== '',
		repeatPass: (repass, password) => password === repass,
		gender: (gender) => gender === 'male' || gender === 'female'
	}

	Object.entries(formObj).forEach(([key, value]) => {
		if (! checks[key](value, formObj.password)) {
			throw new Error(key)
		}
	})

	return true
}

const register = async (e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)

	try {
		checkForValidInput(formObject)

		const response = await user.register({
			username: formObject.username,
			email: formObject.email,
			password: formObject.password,
			gender: formObject.gender
		})

		saveUserInStorage(response)
		page.redirect('/memes')
	} catch (error) {
		showNotification(RegisterView, errors[error.message])
	}
}

const RegisterView = (errorMsg) => html`
    <section id="register">
        <form id="register-form" @submit="${register}">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password"
                       name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password"
                       name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
    ${errorMsg ? Notif(errorMsg) : nothing}`


export { RegisterView }
import { html } from '../node_modules/lit-html/lit-html.js'
import { createFormObject } from '../src/helper.js'
import { user } from '../requests/requests.js'
import { saveUserInStorage } from '../src/helper.js'
import page from '../node_modules/page/page.mjs'

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
				password: formObject.password,
		})

		saveUserInStorage(response)
		page.redirect('/all')
	} catch (error) {
		return alert(errors[error.message])
	}
}

const RegisterView = () => html`
    <section id="register">
        <div class="container">
            <form id="register-form" @submit="${register}">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>`


export { RegisterView }
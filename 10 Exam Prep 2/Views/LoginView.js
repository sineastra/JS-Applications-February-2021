import { html } from '../node_modules/lit-html/lit-html.js'
import { clearForm, createFormObject, showNotification } from '../src/helper.js'
import { user } from '../requests/requests.js'
import { saveUserInStorage } from '../src/helper.js'
import page from '../node_modules/page/page.mjs'

const errors = {
	403: 'Invalid username and/or password',
	'Empty': 'All fields are required!'
}

const login = async (e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)
	console.log(formObject)

	try {
		if (formObject.username === '' || formObject.password === '') {
			throw new Error('Empty')
		}

		const response = await user.login({
			username: formObject.username,
			password: formObject.password
		})

		saveUserInStorage(response)
		page.redirect('/all')
	} catch (error) {
		return alert(errors[error.message])
	}
}

const LoginView = () => {

	return html`
        <section id="login">
            <div class="container">
                <form id="login-form" @submit="${login}">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>`
}

export { LoginView }
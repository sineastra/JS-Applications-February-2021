import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { createFormObject } from '../src/helper.js'
import { user } from '../requests/requests.js'
import { saveUserInStorage } from '../src/helper.js'
import { PageLayout } from '../Components/PageLayout.js'
import page from '../node_modules/page/page.mjs'

const errors = {
	email: 'Invalid Email',
	username: 'Username must be 3 or more symbols',
	password: 'Password must be 3 or more symbols',
	repass: 'Passwords do not match',
	409: 'Username already taken'
}

const checkForValidInput = (formObj) => { // ADD FIELDS IF NEOBHODIMO HOHO
	const checks = {
		email: (email) => /\w+@\w+\.\w+/g.test(email),
		username: (username) => username.length >= 3,
		password: (password) => password.length >= 3,
		repass: (repass, password) => password === repass,
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
			password: formObject.password
		})

		saveUserInStorage(response)
		page.redirect('/myTeams')
	} catch (error) {
		render(PageLayout(RegisterView(errors[error.message])), document.getElementById('content'))
	}
}

const RegisterView = (errorMsg) => html`
    <section id="register">
        <article class="narrow">
            <header class="pad-med">
                <h1>Register</h1>
            </header>
            <form id="register-form" class="main-form pad-large"
                  @submit=${register}>
                ${errorMsg ? html`
                    <div class="error">${errorMsg}</div>` : nothing}
                <label>E-mail: <input type="text" name="email"></label>
                <label>Username: <input type="text" name="username"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="repass"></label>
                <input class="action cta" type="submit" value="Create Account">
            </form>
            <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign
                in
                here</a>
            </footer>
        </article>
    </section>`


export { RegisterView }
import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { createFormObject } from '../src/helper.js'
import { user } from '../requests/requests.js'
import { saveUserInStorage } from '../src/helper.js'
import { PageLayout } from '../Components/PageLayout.js'
import page from '../node_modules/page/page.mjs'

const errors = {
	403: 'Invalid username and/or password',
}

const login = async (e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)

	try {
		const response = await user.login({
			email: formObject.email,
			password: formObject.password
		})

		saveUserInStorage(response)
		page.redirect('/myTeams')
	} catch (error) {
		render(PageLayout(LoginView(errors[error.message])), document.getElementById('content'))
	}
}

const LoginView = (errorMsg) => {

	return html`
        <section id="login">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Login</h1>
                </header>
                <form id="login-form" class="main-form pad-large" @submit="${login}">
                    ${errorMsg ? html`
                        <div class="error">${errorMsg}</div>` : nothing}
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <input class="action cta" type="submit" value="Sign In">
                </form>
                <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up
                    here</a>
                </footer>
            </article>
        </section>`
}

export { LoginView }
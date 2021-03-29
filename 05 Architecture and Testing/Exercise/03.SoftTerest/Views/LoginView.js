import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { createFormObject, showNotification } from '../src/helper.js'
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

	try {
		if (formObject.email === '' || formObject.password === '') {
			throw new Error('Empty')
		}

		const response = await user.login({
			email: formObject.email,
			password: formObject.password
		})

		saveUserInStorage(response)
		page.redirect('/')
	} catch (error) {
		showNotification(LoginView, errors[error.message])
	}
}

const LoginView = (errorMsg) => {

	return html`
        <div class="container home wrapper  my-md-5 pl-md-5">
            <div class="row-form d-md-flex flex-mb-equal ">
                <div class="col-md-4">
                    <img class="responsive" src="./images/idea.png" alt="">
                </div>
                <form class="form-user col-md-7" @submit="${login}">
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                    </div>
                    <div class="form-label-group">
                        <label for="inputEmail">Email</label>
                        <input type="text" id="inputEmail" name="email" class="form-control"
                               placeholder="Email" required=""
                               autofocus="">
                    </div>
                    <div class="form-label-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" id="inputPassword" name="password"
                               class="form-control"
                               placeholder="Password" required="">
                    </div>
                    <div class="text-center mb-4 text-center">
                        <button class="btn btn-lg btn-dark btn-block" type="submit">Sign In</button>
                        <p class="alreadyUser"> Don't have account? Then just
                            <a href="">Sign-Up</a>!
                        </p>
                    </div>
                    <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
                </form>
            </div>
        </div>`
}

export { LoginView }
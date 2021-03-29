import { html } from '../node_modules/lit-html/lit-html.js'
import { createFormObject, showNotification } from '../src/helper.js'
import { user } from '../requests/requests.js'
import { saveUserInStorage } from '../src/helper.js'
import page from '../node_modules/page/page.mjs'

const errors = {
	email: 'Email must be at least 3 characters long',
	password: 'Password must be at least 3 characters long',
	repeatPassword: 'Passwords do not match',
	409: 'Username already taken'
}

const checkForValidInput = (formObj) => {
	const checks = {
		email: (email) => email.length >= 3,
		password: (password) => password !== '',
		repeatPassword: (repass, password) => password === repass,
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
			email: formObject.email,
			password: formObject.password,
		})
		
		console.log(response)

		saveUserInStorage(response)
		page.redirect('/dashboard')
	} catch (error) {
		console.log(error)
		return alert(errors[error.message])
		// showNotification(RegisterView, errors[error.message])
	}
}
const RegisterView = () => {

	return html`
        <div class="container home wrapper  my-md-5 pl-md-5">
            <div class="row-form d-md-flex flex-mb-equal ">
                <div class="col-md-4">
                    <img class="responsive" src="./images/idea.png" alt="">
                </div>
                <form class="form-user col-md-7" @submit="${register}">
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Register</h1>
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
                    <div class="form-label-group">
                        <label for="inputRepeatPassword">Repeat Password</label>
                        <input type="password" id="inputRepeatPassword" name="repeatPassword"
                               class="form-control"
                               placeholder="Repeat Password" required="">
                    </div>
                    <button class="btn btn-lg btn-dark btn-block" type="submit">Sign Up</button>
                    <div class="text-center mb-4">
                        <p class="alreadyUser"> Don't have account? Then just
                            <a href="">Sign-In</a>!
                        </p>
                    </div>
                    <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2019.</p>
                </form>
            </div>
        </div>`
}

export { RegisterView }
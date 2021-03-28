import { html } from 'https://unpkg.com/lit-html?module'
import { login } from '../controllers/userFormsController.js'

const Login = () => {
	document.title = 'Login'

	return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Login User</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit=${login}>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="email">Email</label>
                            <input class="form-control" id="email" type="text" name="email">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="password">Password</label>
                            <input class="form-control" id="password" type="password"
                                   name="password">
                        </div>
                        <input type="submit" class="btn btn-primary" value="Login"/>
                    </div>
                </div>
            </form>
        </div>`
}

export { Login }
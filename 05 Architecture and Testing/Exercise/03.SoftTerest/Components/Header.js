import { html } from '../node_modules/lit-html/lit-html.js'
import { user } from '../requests/requests.js'
import { isUserLogged } from '../src/helper.js'
import page from '../node_modules/page/page.mjs'

const logout = async () => {
	try {
		await user.logout()
	} catch (e) {
		console.log(e)
	}

	sessionStorage.clear()
	page.redirect('/')
}

const getHeaderLinks = (loggedIn) => {
	const email = sessionStorage.getItem('email')

	return loggedIn
		? html`
                <li class="nav-item active">
                    <a class="nav-link" href="/create">Create</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)" @click="${logout}">Logout</a>
                </li>`
		: html`
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>`
}

const Header = () => html`
    <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container">
            <a class="navbar-brand" href="/">
                <img src="./images/idea.png" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/dashboard">Dashboard</a>
                    </li>
                    ${getHeaderLinks(isUserLogged())}
                </ul>
            </div>
        </div>
    </nav>`

export { Header }
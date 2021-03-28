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
                <div class="user">
                    <a href="/create">Create Meme</a>
                    <div class="profile">
                        <span>Welcome, ${email}</span>
                        <a href="/profile">My Profile</a>
                        <a href="javascript:void(0)" @click="${logout}">Logout</a>
                    </div>
                </div>`
		: html`
                <div class="guest">
                    <div class="profile">
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </div>
                    <a class="active" href="/">Home Page</a>
                </div>`
}

const Header = () => html`
    <nav>
        <a href="/memes">All Memes</a>
        ${getHeaderLinks(isUserLogged())}
    </nav>    `

export { Header }
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
	const username = sessionStorage.getItem('username')

	return loggedIn
		? html`
                <div id="profile">
                    <a>Welcome ${username}</a>
                    <a href="myListings">My Listings</a>
                    <a href="/create">Create Listing</a>
                    <a href="javascript:void(0)" @click="${logout}">Logout</a>
                </div>`
		: html`
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`
}

const Header = () => html`
    <nav>
        <a class="active" href="#">Home</a>
        <a href="/all">All Listings</a>
        <a href="/byYear">By Year</a>
        ${getHeaderLinks(isUserLogged())}
    </nav>    `

export { Header }
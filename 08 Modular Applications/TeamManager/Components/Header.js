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

const NavLink = ({ route, text }) =>
	route === 'javascript:void(0)'
		? html`<a @click=${logout} href=${route} class="action">${text}</a>`
		: html`<a href=${route} class="action">${text}</a>`


const getHeaderLinks = (loggedIn) => {
	const linkObj = (route, text) => ({ route, text })

	return loggedIn
		? [
			linkObj('/browse', 'Browse Teams'),
			linkObj('/myTeams', 'My Teams'),
			linkObj('javascript:void(0)', 'Logout'),
		] : [
			linkObj('/browse', 'Browse Teams'),
			linkObj('/login', 'Login'),
			linkObj('/register', 'Register'),
		]
}


const Header = () => html`
    <header id="titlebar" class="layout">
        <a href="/" class="site-logo">Team Manager</a>
        <nav>
            ${getHeaderLinks(isUserLogged()).map(x => NavLink(x))}
        </nav>
    </header>`

export { Header }
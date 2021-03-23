import { html } from 'https://unpkg.com/lit-html?module'
import { isUserLogged } from '../src/helper.js'
import { NavLink } from './NavLink.js'
import { user } from '../requests/requests.js'
import page from '//unpkg.com/page/page.mjs'

const getHeaderLinks = () => {
	const linkObj = (id, href, text) => ({ attributes: { id, href }, text })

	return isUserLogged()
		? [
			linkObj('createLink', '/create', 'Create Furniture'),
			linkObj('profileLink', '/my-furniture', 'My Publications'),
			linkObj('logoutLink', 'javascript:void(0)', 'Logout'),
		]
		: [
			linkObj('loginLink', '/login', 'Login'),
			linkObj('registerLink', '/register', 'Register'),
		]
}

const logout = async () => {
	try {
		await user.logout()
	} catch (e) {
		console.log(e)
	}

	sessionStorage.clear()
	page.redirect('/dashboard')
}

const Header = () => html`
    <header>
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/" class="active">Dashboard</a>
            <div id=${isUserLogged() ? 'user' : 'guest'}>
                ${getHeaderLinks()
                        .map(x => x.attributes.id === 'logoutLink'
                                ? NavLink(x, logout)
                                : NavLink(x))}
            </div>
        </nav>
    </header>`

export { Header }
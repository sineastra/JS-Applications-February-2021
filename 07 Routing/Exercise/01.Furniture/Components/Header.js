import { html } from 'https://unpkg.com/lit-html?module'
import { getHeaderLinks, isUserLogged } from '../src/helper.js'
import { navLink } from './NavLink.js'

const header = () => html`
    <header>
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/" class="active">Dashboard</a>
            <div id=${isUserLogged() ? 'user' : 'guest'}>
                ${getHeaderLinks().map(x => navLink(x))}
            </div>
        </nav>
    </header>`

export { header }
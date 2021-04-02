import { html } from '../node_modules/lit-html/lit-html.js'
import { Header } from './Header.js'
import { Footer } from './Footer.js'

const PageLayout = (...children) => html`
    ${Header()}
    <main>
        ${children}
    </main>
    ${Footer()}`

export { PageLayout }
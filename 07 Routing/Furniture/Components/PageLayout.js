import { html } from 'https://unpkg.com/lit-html?module'
import { Header } from './Header.js'

const PageLayout = (...children) => html`
    ${Header()}
    ${children}`

export { PageLayout }
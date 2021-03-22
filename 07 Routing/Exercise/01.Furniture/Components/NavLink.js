import { html } from 'https://unpkg.com/lit-html?module'

const navLink = ({ attributes, text }) =>
	html`<a id=${attributes.id} href=${attributes.href}>${text}</a>`

export { navLink }
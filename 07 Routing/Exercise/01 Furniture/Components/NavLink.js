import { html } from 'https://unpkg.com/lit-html?module'

const NavLink = ({ attributes, text }, click) =>
	click
		? html`<a @click=${click} id=${attributes.id} href=${attributes.href}>${text}</a>`
		: html`<a id=${attributes.id} href=${attributes.href}>${text}</a>`

export { NavLink }
import { html, render } from 'https://unpkg.com/lit-html?module'
import { header } from './Header.js'

const PageLayout = (container, ...children) => {
	const content = html`
        ${header()}
        ${children.map(x => x)}`

	render(content, container)

	return content
}

export { PageLayout }
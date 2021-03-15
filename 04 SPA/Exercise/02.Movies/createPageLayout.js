import { createNavBar } from './views/createNavBar.js'
import { footer } from './views/footer.js'

function applyPageLayout (parent, pageLayout) {
	parent.innerHTML = ''
	parent.appendChild(pageLayout)

	return parent
}

function createPageLayout (data) {
	const wrapper = document.createDocumentFragment()
	wrapper.appendChild(createNavBar())
	if (data)
		wrapper.appendChild(data)
	wrapper.appendChild(footer)

	return wrapper
}

export { createPageLayout, applyPageLayout }
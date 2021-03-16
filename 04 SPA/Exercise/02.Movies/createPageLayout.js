import { navBarComponent } from './components/navBarComponent.js'
import { footerComponent } from './components/footerComponent.js'

function applyPageLayout (parent, pageLayout) {
	parent.innerHTML = ''
	parent.appendChild(pageLayout)

	return parent
}

function createPageLayout (data) {
	const wrapper = document.createDocumentFragment()
	wrapper.appendChild(navBarComponent())
	if (data)
		wrapper.appendChild(data)
	wrapper.appendChild(footerComponent)

	return wrapper
}

export { createPageLayout, applyPageLayout }
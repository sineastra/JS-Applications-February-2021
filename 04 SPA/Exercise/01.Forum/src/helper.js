const isValidData = obj => Object.values(obj).every(x => x !== '')

const clearFormFields = (form) => [...form.querySelectorAll('input, textarea')]
	.forEach(x => x.value = '')

function eFactory (tag, className = '', content = '') {
	const e = document.createElement(tag)
	e.classList.add(className)
	e.innerHTML = content

	return e
}

export { isValidData, clearFormFields, eFactory }
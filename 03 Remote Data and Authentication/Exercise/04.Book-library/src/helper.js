function displayForm (form, form1) {
	form.style.display = 'block'
	form1.style.display = 'none'
}

function getFormData (form) {
	const formData = new FormData(form)

	return Object.fromEntries([...formData.entries()])
}

function clearFields (form) {
	[...form.children].filter(x => x.tagName === 'INPUT').map(x => x.value = '')
}

function eFactory (tag, content = ' ', className = '') {
	const e = document.createElement(tag)
	e.innerHTML = content
	e.className = className

	return e
}

export { displayForm, getFormData, clearFields, eFactory }
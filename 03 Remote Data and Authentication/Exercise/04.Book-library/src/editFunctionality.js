import { updateBookRequest, getBook, } from './requests.js'
import { displayForm, } from './helper.js'

async function displayEditForm (id, submitForm, editForm) {
	const bookData = await getBook(id)
	const inputs = [...editForm.children].filter(x => x.tagName === 'INPUT')

	displayForm(editForm, submitForm)

	inputs[0].value = bookData.title
	inputs[1].value = bookData.author

	sessionStorage.setItem('editID', id)
}

async function updateBook (e, data, submitForm, editForm) {
	await updateBookRequest(sessionStorage.getItem('editID'), data)
	displayForm(submitForm, editForm)
}

export { displayEditForm, updateBook }
import { removeBook, getBooks } from './requests.js'
import { clearFields, getFormData } from './helper.js'
import { updateBook, displayEditForm } from './editFunctionality.js'
import { createBook, createBookElement } from './createFunctionality.js'

const [submitForm, editForm] = [
	document.getElementById('submitForm'), document.getElementById('editForm')
]
const displayBooks = async () => displayBooksBase(await getBooks())

function displayBooksBase (data) {
	const display = document.querySelector('body > table > tbody')
	display.innerHTML = ''

	Object.entries(data)
		.forEach(([id, data]) => {
			const element = createBookElement({ ...data, id })
			display.appendChild(element)
		})
}

document.getElementById('submitForm').addEventListener('submit', async (e) => {
	e.preventDefault()
	const formData = getFormData(e.target)

	if (formData.author !== '' && formData.title !== '') {
		await createBook(formData)
		displayBooks()
		clearFields(submitForm)
	} else {
		alert('All fields are required!')
	}
})

document.getElementById('editForm').addEventListener('submit', async (e) => {
	e.preventDefault()
	const formData = getFormData(e.target)

	await updateBook(e, formData, submitForm, editForm)
	displayBooks()
})

document.addEventListener('click', e => {

	if (e.target.tagName === 'BUTTON') {
		const bookElement = e.target.parentNode.parentNode
		const actions = {
			loadBooks: displayBooks,
			editBook: () => displayEditForm(bookElement.id, submitForm, editForm),
			deleteBook: async () => {
				await removeBook(bookElement.id)
				bookElement.outerHTML = ''
			},
		}

		try {
			e.target.id ? actions[e.target.id]() : actions[e.target.className]()
		} catch (e) {
			console.log(e)
		}
	}
})

import { eFactory } from './helper.js'
import { postBook } from './requests.js'

function createBookElement ({ author, title, id }) {
	const tr = document.createElement('tr')
	tr.id = id
	const btnTd = document.createElement('td')
	const delBtn = eFactory('button', 'Delete', 'deleteBook')
	const editBtn = eFactory('button', 'Edit', 'editBook')
	const data = [title, author].map(x => eFactory('td', x))

	btnTd.append(editBtn, delBtn)
	tr.append(...data, btnTd)

	return tr
}

async function createBook (formData) {
	if (Object.values(formData).every(x => x !== '')) {
		await postBook(formData)
	}
}

export { createBook, createBookElement }
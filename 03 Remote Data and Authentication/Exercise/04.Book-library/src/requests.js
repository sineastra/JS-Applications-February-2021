async function getBooks () {
	const response = await fetch('http://localhost:3030/jsonstore/collections/books')

	return await response.json()
}

async function getBook (id) {
	const book = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`)

	return await book.json()
}

async function postBook (data) {
	const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})

	const result = await response.json()
}

async function removeBook (id) {
	const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
		method: 'delete'
	})

	return response.json()
}

async function updateBookRequest (id, data) {
	const ajax = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})

	return await ajax.json()
}

export { getBooks, getBook, postBook, removeBook, updateBookRequest }
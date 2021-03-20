import { request, createOptions } from './backendAPI.js'

const baseUrl = 'http://localhost:3030/jsonstore/collections/books'

const loadBooks = async () => await request(baseUrl)
const createBook = async data => request(baseUrl, createOptions('POST', undefined, data))
const getBook = async id => request(`${baseUrl}/${id}`)
const updateBook = async (id, data) => await request(
	`${baseUrl}/${id}`,
	createOptions('PUT', undefined, data)
)

const deleteBook = async (id) => request(`${baseUrl}/${id}`, createOptions('DELETE', undefined))

export {
	loadBooks,
	createBook,
	getBook,
	updateBook,
	deleteBook
}
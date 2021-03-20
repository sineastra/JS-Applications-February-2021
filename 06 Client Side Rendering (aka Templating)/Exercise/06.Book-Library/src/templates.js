import { html } from 'https://unpkg.com/lit-html?module'

const dataTd = (entryData) => html`
    <td>${entryData}</td>`

const tBodyTr = (bookData) => {
	const [id, data] = bookData
	return html`
        <tr id=${id}>
            ${Object.entries(data).filter(x => x[0] !== '_id').map(x => dataTd(x[1]))}
            <td>
                <button class="editBookBtn">Edit</button>
                <button class="deleteBookBtn">Delete</button>
            </td>
        </tr>`
}

const tableTemp = (booksData = []) => {
	console.log(booksData)
	return html`
        <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        ${booksData.map(x => tBodyTr(x))}
        </tbody>`
}

const formTemplate = (className = 'createForm', submitText = 'Submit', id = '') => {
	return html`
        <form id=${id} class=${className}>
            <h3>${submitText === 'Submit' ? 'Create book' : 'Edit book'}</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" .value=${submitText}>
        </form>`
}

const indexPage = (booksData = []) => {
	return html`
        <button id="loadBooks">LOAD ALL BOOKS</button>
        <div id="forms">
            <table>
                ${tableTemp(booksData)}
            </table>
            <div id="formDiv">
                ${formTemplate()}
            </div>
        </div>`
}

export { tableTemp, formTemplate, indexPage }
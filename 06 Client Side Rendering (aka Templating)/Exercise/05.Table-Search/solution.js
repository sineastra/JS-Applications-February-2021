import { render } from 'https://unpkg.com/lit-html?module'
import { table } from './templates.js'

async function getData () {
	const response = await fetch('http://localhost:3030/jsonstore/advanced/table')

	return response.json()
}

const data = await getData()

const tableData = {
	headers: ['Student name', 'Student email', 'Student course',],
	bodyData: Object.values(data)
}

render(table(tableData), document.querySelector('body'))

document.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON' && e.target.id === 'searchBtn') {
		const input = document.getElementById('searchField')
		const rows = [...document.getElementsByTagName('tr')].slice(1)
		rows.forEach(x => x.className = '')

		const selectedRows = rows
			.filter(x => x.textContent.toLocaleLowerCase()
				.includes(input.value.toLocaleLowerCase()))

		selectedRows.forEach(x => x.className = 'select')
		input.value = ''
	}
})
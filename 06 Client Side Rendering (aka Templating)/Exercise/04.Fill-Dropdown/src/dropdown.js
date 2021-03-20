import { render } from 'https://unpkg.com/lit-html?module'
import { dropdownTemp } from './templates.js'
import { getData, postEntry } from './requests.js'


async function drawOptions () {
	const data = await getData()

	render(dropdownTemp(Object.values(data)), document.querySelector('body'))
}

await drawOptions()

document.addEventListener('submit', async e => {
	e.preventDefault()
	const input = document.getElementById(`itemText`)

	await postEntry({
		text: input.value
	})
	await drawOptions()
	input.value = ''
})

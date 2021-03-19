import { render } from 'https://unpkg.com/lit-html?module'
import { townsTemplate } from './templates.js'

document.getElementsByTagName('form')[0].addEventListener('submit', e => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const data = [...formData.values()][0].split(', ')

	render(townsTemplate(data), document.getElementById('root'))
})
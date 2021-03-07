function eFactory (tag, className = '', content = '') {
	const e = document.createElement(tag)
	e.className = className
	e.textContent = content

	return e
}

function template ({ _id, title }) {
	const wrapper = eFactory('div', 'accordion')
	const headDiv = eFactory('div', 'head')
	const titleSpan = eFactory('span', '', title)
	const btn = eFactory('button', 'button', 'More')
	const extraDiv = eFactory('div', 'extra')
	extraDiv.style.display = 'none'
	const contentParagraph = eFactory('p')
	btn.id = _id

	headDiv.append(titleSpan, btn)
	extraDiv.appendChild(contentParagraph)
	wrapper.append(headDiv, extraDiv)

	btn.addEventListener('click', async () => {
		if (extraDiv.style.display === 'none') {
			const data = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${_id}`)
			const desData = await data.json()
			btn.textContent = 'Less'
			extraDiv.style.display = 'block'
			contentParagraph.textContent = desData.content
		} else {
			btn.textContent = 'More'
			extraDiv.style.display = 'none'
		}
	})

	return wrapper
}

async function solution () {
	const output = document.getElementById('main')
	const titles = await fetch('http://localhost:3030/jsonstore/advanced/articles/list')
	const desTitles = await titles.json()

	desTitles.forEach(x => output.appendChild(template(x)))
}

document.addEventListener('DOMContentLoaded', solution)
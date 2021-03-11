const baseUrl = `http://localhost:3030/jsonstore/phonebook`

function createLi ({ person, phone, _id }) {
	const e = document.createElement('li')
	e.id = _id
	e.innerHTML = `${person}: ${phone}`
	const deleteBtn = document.createElement('button')
	deleteBtn.innerHTML = 'Delete'
	deleteBtn.className = 'remove'

	e.appendChild(deleteBtn)

	return e
}

async function createData () {
	const [person, phone] = [
		document.getElementById('person').value, document.getElementById('phone').value
	]

	const response = await fetch(baseUrl, {
		method: 'post',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ person, phone })
	})

	return await response.json()
}

async function getData (url) {
	const response = await fetch(url)
	const data = await response.json()

	return Object.values(data)
}

function displayData (data) {
	const output = document.getElementById('phonebook')
	output.innerHTML = ''
	data.forEach(x => output.appendChild(createLi(x)))
}

async function deleteData (e, id) {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: 'delete'
	})

	e.outerHTML = ''
}

function attachEvents () {
	document.addEventListener('click', e => {
		if (e.target.tagName === 'BUTTON') {
			const actions = {
				btnLoad: async () => displayData(await getData(baseUrl)),
				btnCreate: async () => {
					await createData()
					displayData(await getData(baseUrl))
				},
				remove: () => deleteData(e.target.parentNode, e.target.parentNode.id),
			}

			e.target.id ? actions[e.target.id]() : actions[e.target.className]()
		}
	})
}

attachEvents()
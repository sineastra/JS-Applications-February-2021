const clearFields = (arr) => arr.forEach(x => x.value = '')

function validData (data) {
	return data.every(([_, value]) => value !== '')
}

function displayStudents (studentsData) {
	const table = document.querySelector('#results > tbody')
	table.innerHTML = ''

	Object.values(studentsData).forEach(student => {
		const tr = document.createElement('tr')

		Object.entries(student).forEach(([key, value]) => {
			const td = document.createElement('td')

			if (key !== '_id') {
				td.innerHTML = value
				tr.appendChild(td)
			}
		})

		table.appendChild(tr)
	})

}

async function getStudents () {
	const response = await fetch('http://localhost:3030/jsonstore/collections/students')

	return await response.json()
}

async function postStudent (data) {
	const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
		method: 'post',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(Object.fromEntries(data))
	})

	return await response.json()
}

document.addEventListener('submit', async (e) => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const data = [...formData.entries()]

	if (validData(data)) {
		await postStudent(data)
		displayStudents(await getStudents())
		clearFields([...document.querySelectorAll('#form > div.inputs > input[type=text]')])
	}
})

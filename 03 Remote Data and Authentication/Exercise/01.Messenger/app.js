function attachEvents () {
	const url = 'http://localhost:3030/jsonstore/messenger'

	const clearInputs = (arr) => arr.forEach(x => x.value = '')

	document.getElementById(`submit`).addEventListener('click', async () => {
		const author = document.querySelector('#controls > input[type=text]:nth-child(2)')
		const content = document.querySelector('#controls > input[type=text]:nth-child(5)')
		const rawData = { author: author.value, content: content.value }

		const response = await fetch(url, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(rawData)
		})

		clearInputs([author, content])

		return response
	})

	document.getElementById('refresh').addEventListener('click', async () => {
		const data = await fetch(url)
		const deserialized = await data.json()

		console.log(deserialized)
		document.getElementById(`messages`).innerHTML =
			Object.values(deserialized).map(x => `${x.author}: ${x.content}`).join('\n')
	})
}

attachEvents()
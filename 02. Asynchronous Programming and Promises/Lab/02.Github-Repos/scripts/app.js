async function loadRepos () {
	const html = {
		nameField: document.getElementById(`username`),
		resultE: document.getElementById(`repos`),
	}

	const data = await fetch(`https://api.github.com/users/${html.nameField.value}/repos`)
	const deserilized = await data.json()

	html.resultE.innerHTML = ''

	deserilized.forEach(({ full_name, html_url }) => {
		const li = document.createElement('li')
		const a = document.createElement('a')
		a.innerHTML = full_name
		a.href = html_url

		li.appendChild(a)
		html.resultE.appendChild(li)
	})
}
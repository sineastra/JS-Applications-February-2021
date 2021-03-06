async function loadCommits () {
	const html = {
		nameField: document.getElementById(`username`),
		repoField: document.getElementById(`repo`),
		resultE: document.getElementById(`commits`),
	}

	html.resultE.innerHTML = ''

	const eFactory = (tag, content = '') => {
		const e = document.createElement(tag)
		e.innerHTML = content

		return e
	}

	try {
		const data = await fetch(`https://api.github.com/repos/${html.nameField.value}/${html.repoField.value}/commits`)

		if (! data.ok) throw new Error(`${data.status} (${data.statusText})`)

		const deserialized = await data.json()

		deserialized.forEach(({ commit }) => html.resultE.appendChild(eFactory(
			'li',
			`${commit.author.name}: ${commit.message}`
		)))

	} catch (e) {
		html.resultE.appendChild(eFactory('li', e))
	}

}
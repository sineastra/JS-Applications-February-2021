import { deserializeFormData, redirect } from './helper.js'


async function createRecipe ({ name, img, ingredients, preparation }, url) {
	const request = await fetch(url, {
		method: 'post',
		headers: {
			'X-Authorization': sessionStorage.getItem('accessToken'),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, img, ingredients, preparation })
	})

	console.log(await request.json())
}

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('createRecipe').addEventListener('submit', async e => {
		e.preventDefault()
		const data = deserializeFormData(e.target)

		await createRecipe(data, 'http://localhost:3030/data/recipes')
		redirect('create.html', 'index.html')
	})
})
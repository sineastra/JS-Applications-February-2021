const url = 'http://localhost:3030/jsonstore/cookbook/'
const makeArrayOfNodes = (arr, tag) => arr.map(x => `<${tag}>${x}</${tag}>`).join('')

function makeBasicCard ({ img, name, _id }, url) {
	const article = document.createElement('article')

	article.className = 'preview'
	article.innerHTML = `<div class="title">
<h2>${name}</h2>
</div>
<div class="small">
<img src=${img}>
</div>`

	article.addEventListener(
		'click',
		async () => article.replaceWith(makeAdvCard(await deserializeToJSON(`${url}`)))
	)

	return article
}

function makeAdvCard ({ name, img, ingredients, steps }) {
	const article = document.createElement('article')

	article.innerHTML = `<h2>${name}</h2>
<div class="band">
<div class="thumb">
<img src=${img}>
</div>
<div class="ingredients">
<h3>Ingredients:</h3>
<ul>
${makeArrayOfNodes(ingredients, 'li')}
</ul>
</div>
</div>
<div class="description">
<h3>Preparation:</h3>
${makeArrayOfNodes(steps, 'p')}
</div>`

	return article
}

async function deserializeToJSON (url) {
	const data = await fetch(url)

	return await data.json()
}


async function loadRecipes (allUrl, singleUrl) {
	const dataField = document.querySelector('main')
	dataField.innerHTML = ''

	Object.values(await deserializeToJSON(allUrl))
		.forEach(x => dataField.appendChild(makeBasicCard(x, `${singleUrl}/${x._id}`)))
}


// commented bcs of the export. de-comment it if gonna use only this code to add the listener

// document.addEventListener(
// 	'DOMContentLoaded',
// 	() => loadRecipes(`${url}recipes`, `${url}details`)
// )

export default loadRecipes


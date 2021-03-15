import { getCatchData, isOwner, isValidData } from './helper.js'
import { createCatch, getAllCatches, updateCatch, deleteCatch } from './requests.js'
import { catchTemplate } from './templates.js'

const btns = [...document.querySelector('main').querySelectorAll('button')]

if (! sessionStorage.getItem('accessToken')) {
	btns.forEach(x => {
		if (x.className !== 'load')
			x.disabled = true
	})
} else {
	const catchBtns = [...document.getElementById('catches').getElementsByTagName('button')]
	btns.forEach(x => {
		x.disabled = false
	})
	catchBtns.forEach(x => {
		if (x.parentNode.id !== sessionStorage.getItem('_id')) {
			x.disabled = true
		}
	})
}

async function loadCatches () {
	const data = await getAllCatches()
	const catchesParent = document.getElementById(`catches`)
	catchesParent.innerHTML = ''

	Object.values(data)
		.forEach(x => catchesParent.appendChild(catchTemplate(x, isOwner(x._ownerId))))
}

document.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON') {
		const inputsParent = e.target.parentNode

		const actions = {
			add: async () => {
				if (isValidData(inputsParent)) {
					await createCatch(getCatchData(inputsParent))
					await loadCatches()
				} else {
					alert('missing fields')
				}
			},
			load: loadCatches,
			update: async () => {
				if (isValidData(inputsParent)) {
					await updateCatch(inputsParent.id, getCatchData(inputsParent))
					await loadCatches()
				} else {
					alert('missing fields')
				}
			},
			'delete': async () => {
				await deleteCatch(inputsParent.id)
				await loadCatches()
			}
		}

		actions[e.target.className]()
	}
})


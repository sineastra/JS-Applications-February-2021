import loadRecipes from './part1App.js'
import logout from './logout.js'


function displayHeader () {
	const header = {
		loggedIn: document.getElementById('user'),
		loggedOut: document.getElementById(`guest`),
	}
	const logoutBtn = document.getElementById('logoutBtn')

	if (sessionStorage.accessToken) {
		header.loggedIn.style.display = 'inline-block'
		header.loggedOut.style.display = 'none'
		logoutBtn.addEventListener('click', logout)
	} else {
		header.loggedIn.style.display = 'none'
		header.loggedOut.style.display = 'inline-block'
		logoutBtn.removeEventListener('click', logout)
	}
}

document.addEventListener(
	'DOMContentLoaded',
	() => {
		displayHeader()

		if (sessionStorage.accessToken) {
			loadRecipes(
				'http://localhost:3030/data/recipes?select=_id%2Cname%2Cimg',
				'http://localhost:3030/data/recipes'
			)
		}
	}
)

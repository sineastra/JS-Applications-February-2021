import { createPageLayout, applyPageLayout } from '../createPageLayout.js'
import { loginView } from '../views/loginView.js'
import { deserializeFormData, isValidInput, clearFormFields, checkServerError } from './helper.js'
import { createMovie, loginRequest, logoutRequest, registerRequest } from './requests.js'
import { registerView } from '../views/registerView.js'
import { getHomePageView } from '../views/homePageView.js'
import { addMovieView } from '../views/addMovieView.js'

const mainContainer = document.getElementById(`container`)
const displayPage = applyPageLayout.bind(undefined, mainContainer)

displayPage(createPageLayout(await getHomePageView()))

async function loginLogic (formType, request, data, form) {
	const response = await request(data)
	if (isValidInput(formType, data) && checkServerError(response)) {
		displayPage(createPageLayout(await getHomePageView()))
		clearFormFields(form)
	}
}

const login = loginLogic.bind(undefined, 'login', loginRequest)
const register = loginLogic.bind(undefined, 'register', registerRequest)

document.addEventListener('click', e => {
	const btns = {
		login: () => {
			displayPage(createPageLayout(loginView))
		},
		logout: async () => {
			await logoutRequest()
			sessionStorage.clear()
			displayPage(createPageLayout(await getHomePageView()))
		},
		register: async () => {
			displayPage(createPageLayout(registerView))
		},
		addMovieBtn: () => displayPage(createPageLayout(addMovieView))
	}

	try {
		btns[e.target.dataset.id]()
	} catch (e) {
		console.log(e)
	}
})

document.addEventListener('submit', e => {
	e.preventDefault()
	const data = deserializeFormData(e.target)

	const forms = {
		'loginForm': () => login(data, e.target),
		'registerForm': () => register(data, e.target),
		'addMovieForm': async () => {
			if (isValidInput('addMovie', data)) {
				await createMovie(data)
				displayPage(createPageLayout(await getHomePageView()))
			}
		}
	}

	forms[e.target.dataset.id]()
})
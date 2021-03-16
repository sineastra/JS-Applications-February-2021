import { createPageLayout, applyPageLayout } from '../createPageLayout.js'
import { loginView } from '../views/loginView.js'
import { deserializeFormData, isValidInput, clearFormFields, checkServerError } from './helper.js'
import { loginRequest, logoutRequest, registerRequest } from './requests.js'
import { registerView } from '../views/registerView.js'
import { homePageView } from '../views/homePageView.js'

const mainContainer = document.getElementById(`container`)
const displayPage = applyPageLayout.bind(undefined, mainContainer)

displayPage(createPageLayout(homePageView))

async function loginLogic (formType, request, data, form) {
	if (isValidInput(formType, data) && await checkServerError(() => request(data))) {
		displayPage(createPageLayout(homePageView))
		clearFormFields(form)
	}
}

const login = loginLogic.bind(undefined, 'login', loginRequest)
const register = loginLogic.bind(undefined, 'register', registerRequest)

document.addEventListener('click', e => {
	const navBarBtns = {
		login: () => {
			displayPage(createPageLayout(loginView))
		},
		logout: async () => {
			await logoutRequest()
			sessionStorage.clear()
			displayPage(createPageLayout(homePageView))
		},
		register: async () => {
			displayPage(createPageLayout(registerView))
		}
	}

	try {
		navBarBtns[e.target.dataset.id]()
	} catch (e) {

	}
})

document.addEventListener('submit', e => {
	e.preventDefault()
	const data = deserializeFormData(e.target)

	const forms = {
		'loginForm': () => login(data, e.target),
		'registerForm': () => register(data, e.target),
	}

	forms[e.target.dataset.id]()
})
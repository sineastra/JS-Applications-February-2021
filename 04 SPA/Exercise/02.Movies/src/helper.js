const getNavBarLinks = () => JSON.stringify(sessionStorage) === '{}'
	? ['Login', 'Register']
	: [`Welcome, ${sessionStorage.email}`, 'Logout']

function eFactory (tag, className = '', content = '') {
	const e = document.createElement(tag)
	e.className = className
	e.innerHTML = content

	return e
}

const displayMsg = (output, msg) => output ? output.innerHTML = msg : alert(msg)

const deserializeFormData = (form) => Object.fromEntries([...new FormData(form).entries()])

function isValidInput (formType, data, output) {
	const types = {
		register: (data) => {
			if (data.password !== data.repeatPassword) {
				displayMsg(output, 'Passwords do not match!')
				return false
			}
			if (data.password.length >= 6) {
				displayMsg(output, 'Password must be at least 6 symbols long!')
				return false
			}
		},
		login: (data) => {
			if (data.email === '' || data.password === '') {
				displayMsg(output, 'Email and Password must not be empty!')
				return false
			}
		},
		addMovie: data => {
			if (data.title === '' || data.img === '' || data.description === '') {
				displayMsg(output, 'All fields are required!')
				return false
			}
		}
	}

	types[formType](data)

	return true
}

function clearFormFields (form) {
	[...form.querySelectorAll('input, textarea')].forEach(x => x.value = '')
}

function checkServerError (response) {
	if (! response.ok) {
		alert(response.message)
		return false
	}

	return true
}

const parseMovieData = () => JSON.parse(sessionStorage.getItem('movieData'))

const userLoggedIn = () => sessionStorage.getItem('accessToken')

export {
	getNavBarLinks,
	eFactory,
	displayMsg,
	deserializeFormData,
	isValidInput,
	clearFormFields,
	checkServerError,
	parseMovieData,
	userLoggedIn
}
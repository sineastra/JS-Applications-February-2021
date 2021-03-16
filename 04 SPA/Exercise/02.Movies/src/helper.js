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

	if (data.email === '' || data.password === '') {
		displayMsg(output, 'Email and Password must not be empty!')
		return false
	}
	if (formType === 'register') {
		if (data.password !== data.repeatPassword) {
			displayMsg(output, 'Passwords do not match!')
			return false
		}
		if (data.password.length >= 6) {
			displayMsg(output, 'Password must be at least 6 symbols long!')
			return false
		}
	}

	return true
}

function clearFormFields (form) {
	[...form.querySelectorAll('input, textarea')].forEach(x => x.value = '')
}

async function checkServerError (request) {
	const response = await request()

	if (!response.ok) {
		alert(response.message)
	}
}

export {
	getNavBarLinks,
	eFactory,
	displayMsg,
	deserializeFormData,
	isValidInput,
	clearFormFields,
	checkServerError
}
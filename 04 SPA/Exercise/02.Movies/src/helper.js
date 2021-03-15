const getNavBarLinks = () => JSON.stringify(sessionStorage) === '{}'
	? ['Login', 'Register']
	: [`Welcome, ${sessionStorage.email}`, 'Logout']

function eFactory (tag, className = '', content = '') {
	const e = document.createElement(tag)
	e.className = className
	e.innerHTML = content

	return e
}

const displayMsg = (msg, output) => output ? output.innerHTML = msg : alert(msg)

const deserializeFormData = (form) => Object.fromEntries([...new FormData(form).entries()])

function validateFields (data, output) {

	if (data.email === '' || data.password === '') {
		displayMsg(output, 'Email and Password must not be empty!')
		return false
	}
	if (data.password !== data.rePass) {
		displayMsg(output, 'Passwords do not match!')
		return false
	}

	return true
}

export { getNavBarLinks, eFactory, displayMsg, deserializeFormData, validateFields }
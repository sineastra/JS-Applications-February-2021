const getNavBarLinks = () => JSON.stringify(sessionStorage) === '{}'
	? ['Login', 'Register']
	: [`Welcome, ${sessionStorage.email}`, 'Logout']

function eFactory (tag, className = '', content = '') {
	const e = document.createElement(tag)
	e.className = className
	e.innerHTML = content

	return e
}

export { getNavBarLinks, eFactory }
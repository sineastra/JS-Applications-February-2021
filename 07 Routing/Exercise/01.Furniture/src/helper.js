const getUserInfo = () => sessionStorage.getItem('accessToken')
const isUserLogged = () => getUserInfo() ? true : false

const getHeaderLinks = () => {
	const linkObj = (id, href, text) => ({ attributes: { id, href }, text })
	return getUserInfo()
		? [
			linkObj('createLink', '/create', 'Create Furniture'),
			linkObj('profileLink', '/my-furniture', 'My Publications'),
			linkObj('logoutLink', 'javascript:void(0)', 'Logout'),
		]
		: [
			linkObj('loginLink', '/login', 'Login'),
			linkObj('registerLink', '/register', 'Register'),
		]
}


export { getHeaderLinks, isUserLogged }
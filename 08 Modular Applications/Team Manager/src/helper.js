const isUserLogged = () => sessionStorage.getItem('accessToken') ? true : false

const createFormObject = (form) => {
	const formData = new FormData(form)

	return Object.fromEntries([...formData.entries()])
}

const saveUserInStorage = data => {
	sessionStorage.setItem('email', data.email)
	sessionStorage.setItem('username', data.username)
	sessionStorage.setItem('id', data._id)
	sessionStorage.setItem('accessToken', data.accessToken)

	return data
}

export { isUserLogged, createFormObject, saveUserInStorage }
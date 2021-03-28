const isUserLogged = () => sessionStorage.getItem('accessToken') ? true : false

const createFormObject = (form) => {
	const formData = new FormData(form)

	return Object.fromEntries([...formData.entries()])
}

export { isUserLogged, createFormObject }
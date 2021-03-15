const getInputData = (parent) => [...parent.querySelectorAll('input')]
const isOwner = (ownerId) => ownerId === sessionStorage.getItem('_id')
const getCatchData = (parent) =>
	getInputData(parent).reduce((a, v) => {
		a[v.className] = v.value
		return a
	}, {})
const isValidData = (parent) => getInputData(parent).every(x => x.value !== '')

export { isOwner, getCatchData, isValidData }
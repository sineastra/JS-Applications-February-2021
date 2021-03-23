import { createFormObject } from '../src/helper.js'
import { furniture } from '../requests/requests.js'
import page from '//unpkg.com/page/page.mjs'

const applyClass = (n, isValid) => {
	const node = document.querySelector(`[name=${n}]`)

	node.classList.remove('is-valid', 'is-invalid')
	node.classList.add(isValid ? 'is-valid' : 'is-invalid')

	return node
}

const performValidation = (formObj) => {
	const fieldsData = Object.entries(formObj)
	const validations = {
		make: v => v.length >= 4,
		model: v => v.length >= 4,
		year: v => ! isNaN(v) && Number(v) >= 1950 && Number(v) <= 2050,
		description: v => v.length > 10,
		price: v => ! isNaN(v) && Number(v) > 0,
		img: v => v !== '',
	}
	let flag = true

	fieldsData.forEach(([fieldName, fieldValue]) => {
		if (validations[fieldName]) {
			const isValid = validations[fieldName](fieldValue)
			if (isValid === false) flag = false

			applyClass(fieldName, isValid)
		}
	})

	return flag
}

// if (performValidation) sounds stupid. 
const isValidForm = (formObj) => performValidation(formObj)

const sendFurnitureData = async (requestType, id, e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)

	if (isValidForm(formObject)) {
		await furniture[requestType](formObject, id)

		page.redirect('/dashboard')
	}
}

export { sendFurnitureData }
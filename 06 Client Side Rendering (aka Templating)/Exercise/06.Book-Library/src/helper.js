const clearInputs = (...inputs) => inputs.forEach(x => x.value = '')
const getId = e => e.target.parentNode.parentNode.id
const checkValidInput = (formData) => formData.every(x => x !== '' && x !== ' ')

export { clearInputs, getId, checkValidInput }
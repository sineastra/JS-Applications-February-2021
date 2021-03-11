const displayMsg = (msg, output) => output ? output.innerHTML = msg : alert(msg)
const deserializeFormData = (form) => Object.fromEntries([...new FormData(form).entries()])
const redirect = (oldURI, newURI) =>
	window.location.replace(window.location.pathname.replace(oldURI, newURI))

export { displayMsg, deserializeFormData, redirect }
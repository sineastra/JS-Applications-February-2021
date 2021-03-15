function loadView (newView) {
	document.body.innerHTML = ''
	document.body.appendChild(newView)
}

function displayYears (view) {
	loadView(view)
}

function displayYear (years, year) {
	loadView(years[`year-${year}`])
}

function displayMonth (months, monthIndex, year) {
	const monthElement = months.find(x => x.id === `month-${year}-${monthIndex+1}`)
	loadView(monthElement)
}

export { loadView, displayYears, displayYear, displayMonth }
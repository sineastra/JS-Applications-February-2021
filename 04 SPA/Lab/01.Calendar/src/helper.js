const clickedValidYear = e =>
	e.path.some(x => x.id === 'years' && x.tagName === 'SECTION') &&
	(e.target.className === 'date' || e.target.className === 'day')

const clickedValidMonth = e =>
	e.path.some(x => x.className === 'monthCalendar' && x.tagName === 'SECTION')

const validMonths = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export { clickedValidYear, clickedValidMonth, validMonths }
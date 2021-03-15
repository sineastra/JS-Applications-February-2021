import { loadView, displayMonth, displayYear, displayYears } from './displays.js'
import { clickedValidMonth, clickedValidYear, validMonths } from './helper.js'

const yearsView = document.getElementById('years')
const years = [...document.getElementsByClassName('monthCalendar')].reduce((a, v) => {
	a[v.id] = v
	return a
}, {})
const months = [...document.getElementsByClassName('daysCalendar')]

loadView(yearsView)

document.addEventListener('click', e => {
		if (clickedValidYear(e)) {
			displayYear(years, e.target.textContent.trim())
		} else if (clickedValidMonth(e)) {
			const year = document.querySelector('caption').innerText
			const month = e.target.innerText.trim()
			const monthIndex = validMonths.findIndex(x => x === month)

			if (monthIndex !== -1) {
				displayMonth(months, monthIndex, year)
			}
		}

		if (e.target.tagName === 'CAPTION') {
			const captionText = e.target.innerText

			if (isNaN(captionText)) {
				const year = captionText.match(/[1-2]{1}[0-9]{3}/g)
				displayYear(years, year)
			} else {
				displayYears(yearsView)
			}
		}
	}
)
import { html } from '../node_modules/lit-html/lit-html.js'
import { ListingComponent } from '../Components/Listing.js'
import page from '../node_modules/page/page.mjs'

const displayMatches = async () => {
	const year = document.getElementById('search-input').value

	page.redirect(`/byYear?year=${year}`)
}

const ByYearView = (matches, year) => {
	console.log(matches, year)

	return html`
        <section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search"
                       placeholder="Enter desired production year">
                <button class="button-list" @click="${displayMatches}">Search
                </button>
            </div>

            <h2>Results:</h2>
            <div class="listings">
                ${matches.length > 0
                        ? matches.map(ListingComponent)
                        : html`<p class="no-cars"> No results.</p>`}
            </div>
        </section>`
}

export { ByYearView }
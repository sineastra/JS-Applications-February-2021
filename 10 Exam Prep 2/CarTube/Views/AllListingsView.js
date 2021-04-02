import { html } from '../node_modules/lit-html/lit-html.js'
import { ListingComponent } from '../Components/Listing.js'


const AllListingsView = (listings) => {
	return html`
        <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
                ${listings.length > 0
                        ? listings.map(ListingComponent)
                        : html`<p class="no-cars">No cars in database.</p>`}
            </div>
        </section>`
}

export { AllListingsView }
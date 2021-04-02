import { html, nothing } from '../node_modules/lit-html/lit-html.js'
import { cars } from '../requests/requests.js'
import page from '../node_modules/page/page.mjs'

const isOwner = (ownerId) => ownerId === sessionStorage.getItem('id')

const deleteListing = async (id) => {
	try {
		await cars.deleteListing(id)
	} catch (e) {
		return alert(e.message)
	}

	page.redirect('/all')
}

const DetailsView = ({ _id, _ownerId, brand, model, year, price, description, imageUrl }) => {

	return html`
        <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src="${imageUrl}">
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${brand}</li>
                    <li><span>Model:</span>${model}</li>
                    <li><span>Year:</span>${year}</li>
                    <li><span>Price:</span>${price}$</li>
                </ul>

                <p class="description-para">${description}</p>

                ${isOwner(_ownerId)
                        ? html`
                            <div class="listings-buttons">
                                <a href="/edit/${_id}" class="button-list">Edit</a>
                                <a href="javascript:void(0)" @click="${() => deleteListing(_id)}"
                                   class="button-list">Delete</a>
                            </div>`
                        : nothing}
            </div>
        </section>`
}

export { DetailsView }
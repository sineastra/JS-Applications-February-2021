import { html, nothing } from 'https://unpkg.com/lit-html?module'
import { furniture } from '../requests/requests.js'
import page from '//unpkg.com/page/page.mjs'

const deleteFurniture = async (id) => {
	await furniture.delete(id)

	page.redirect('/dashboard')
}

const Details = ({ _id, make, model, year, description, price, material, img, isOwn }) => {
	document.title = 'Details'
	const imgSrc = img.slice(0, 4) === 'http' ? img : `/${img}`

	return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Furniture Details</h1>
                </div>
            </div>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img srcset="${imgSrc}"/>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <p>Make: <span>${make}</span></p>
                    <p>Model: <span>${model}</span></p>
                    <p>Year: <span>${year}</span></p>
                    <p>Description: <span>${description}</span></p>
                    <p>Price: <span>${price}</span></p>
                    <p>Material: <span>${material}</span></p>
                    ${isOwn ? html`
                        <div>
                            <a href="/edit/${_id}" class="btn btn-info">Edit</a>
                            <a href="javascript:void(0)" @click=${() => deleteFurniture(_id)}
                               class="btn btn-red">Delete</a>
                        </div>` : nothing}
                </div>
            </div>
        </div>`
}

export { Details }
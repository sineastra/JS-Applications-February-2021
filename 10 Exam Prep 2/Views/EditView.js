import { html } from '../node_modules/lit-html/lit-html.js'
import { createFormObject } from '../src/helper.js'
import { cars } from '../requests/requests.js'
import page from '../node_modules/page/page.mjs'

const updateListing = async (id, e) => {
	e.preventDefault()
	const carObj = createFormObject(e.target)
	carObj.price = Number(carObj.price)
	carObj.year = Number(carObj.year)

	try {
		//validation
		Object.entries(carObj).forEach(([key, value]) => {
			if (value === '') {
				throw new Error('All fields are required')
			}
			if ((key === 'year' || key === 'price') && value <= 0) {
				throw new Error('Year and Price must be positive numbers!')
			}
		})

		await cars.updateListing(id, carObj)
		await cars.updateListing(id, carObj)

		page.redirect('/all')
	} catch (error) {
		return alert(error.message)
	}
}

const EditView = ({ _id, _ownerId, brand, model, year, price, description, imageUrl }) => {

	return html`
        <section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit="${(e) => updateListing(_id, e)}">
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" value="${brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" value="${model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description"
                           value="${description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" value="${year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl"
                           value="${imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price"
                           value="${price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>`
}

export { EditView }
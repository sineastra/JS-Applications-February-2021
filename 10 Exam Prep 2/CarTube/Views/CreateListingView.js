import { html } from '../node_modules/lit-html/lit-html.js'
import { createFormObject } from '../src/helper.js'
import { cars } from '../requests/requests.js'
import page from '../node_modules/page/page.mjs'

const createListing = async (e) => {
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

		await cars.createListing(carObj)

		page.redirect('/all')
	} catch (error) {
		return alert(error.message)
	}
}


const CreateListingView = () => {

	return html`
        <section id="create-listing">
            <div class="container">
                <form id="create-form" @submit="${createListing}">
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
	`
}

export { CreateListingView }
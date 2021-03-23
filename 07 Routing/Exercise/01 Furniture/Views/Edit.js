import { html } from 'https://unpkg.com/lit-html?module'
import { sendFurnitureData } from '../controllers/furnitureFormsController.js'

const Edit = ({ _id, make, model, year, description, price, material, img }) => {
	document.title = `Edit ${make}`

	return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Edit Furniture</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit=${e => sendFurnitureData('update', _id, e)}>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-make">Make</label>
                            <input class="form-control" id="new-make" type="text" name="make"
                                   .value=${make}>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-model">Model</label>
                            <input class="form-control" id="new-model" type="text"
                                   name="model" .value=${model}>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-year">Year</label>
                            <input class="form-control" id="new-year" type="number"
                                   name="year" .value=${year}>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label"
                                   for="new-description">Description</label>
                            <input class="form-control" id="new-description" type="text"
                                   name="description" value=${description}>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-price">Price</label>
                            <input class="form-control" id="new-price" type="number" name="price"
                                   value=${price}>
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-image">Image</label>
                            <input class="form-control" id="new-image" type="text" name="img"
                                   value="${img}">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-material">Material
                                (optional)</label>
                            <input class="form-control" id="new-material" type="text"
                                   name="material" value=${material || ''}>
                        </div>
                        <input type="submit" class="btn btn-info" value="Edit"/>
                    </div>
                </div>
            </form>
        </div>`
}

export { Edit }
import { html } from 'https://unpkg.com/lit-html?module'
import { sendFurnitureData } from '../controllers/furnitureFormsController.js'

const Create = () => {
	document.title = 'Create'

	return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Create New Furniture</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit=${e => sendFurnitureData('create', undefined, e)}>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-make">Make</label>
                            <input class="form-control valid" id="new-make" type="text" name="make">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-model">Model</label>
                            <input class="form-control" id="new-model" type="text"
                                   name="model">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-year">Year</label>
                            <input class="form-control" id="new-year" type="number"
                                   name="year">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label"
                                   for="new-description">Description</label>
                            <input class="form-control" id="new-description" type="text"
                                   name="description">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-price">Price</label>
                            <input class="form-control" id="new-price" type="number" name="price">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-image">Image</label>
                            <input class="form-control" id="new-image" type="text" name="img">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-material">Material
                                (optional)</label>
                            <input class="form-control" id="new-material" type="text"
                                   name="material">
                        </div>
                        <input type="submit" class="btn btn-primary" value="Create"/>
                    </div>
                </div>
            </form>
        </div>`
}

export { Create }
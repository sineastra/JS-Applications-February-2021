import { html } from 'https://unpkg.com/lit-html?module'

const Edit = () => {
	document.title = 'Edit'

	return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Edit Furniture</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-make">Make</label>
                            <input class="form-control" id="new-make" type="text" name="make"
                                   value="Table">
                        </div>
                        <div class="form-group has-success">
                            <label class="form-control-label" for="new-model">Model</label>
                            <input class="form-control is-valid" id="new-model" type="text"
                                   name="model" value="Swedish">
                        </div>
                        <div class="form-group has-danger">
                            <label class="form-control-label" for="new-year">Year</label>
                            <input class="form-control is-invalid" id="new-year" type="number"
                                   name="year" value="2015">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label"
                                   for="new-description">Description</label>
                            <input class="form-control" id="new-description" type="text"
                                   name="description" value="Medium table">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-price">Price</label>
                            <input class="form-control" id="new-price" type="number" name="price"
                                   value="235">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-image">Image</label>
                            <input class="form-control" id="new-image" type="text" name="img"
                                   value="/images/table.png">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-material">Material
                                (optional)</label>
                            <input class="form-control" id="new-material" type="text"
                                   name="material" value="Wood">
                        </div>
                        <input type="submit" class="btn btn-info" value="Edit"/>
                    </div>
                </div>
            </form>
        </div>`
}

export { Edit }
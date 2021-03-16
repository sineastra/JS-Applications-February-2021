import { eFactory } from '../src/helper.js'

function editMovieView ({ title, description, img }) {
	const innerHTML = `<form data-id="editMovieForm" class="text-center border border-light p-5">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" value="${title}" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description">${description}</textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">image</label>
            <input type="text" class="form-control" placeholder="Image Url" value="${img}" name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>`

	const editMovieSection = eFactory('section', '', innerHTML)
	editMovieSection.id = 'edit-movie'

	return editMovieSection
}

export { editMovieView }
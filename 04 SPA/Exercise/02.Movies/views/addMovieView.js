import { eFactory } from '../src/helper.js'

const innerHTML = `<form class="text-center border border-light p-5" data-id="addMovieForm">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" name="img" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`

const addMovieView = eFactory('section', '', innerHTML)
addMovieView.id = 'add-movie'

export { addMovieView }
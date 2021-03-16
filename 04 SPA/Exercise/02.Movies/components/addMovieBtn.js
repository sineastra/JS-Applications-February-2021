import { eFactory } from '../src/helper.js'

const addMovieBtn = eFactory(
	'section',
	'',
	`<a href="javascript:void(0)" data-id="addMovieBtn" class="btn btn-warning ">Add Movie</a>`
)
addMovieBtn.id = 'add-movie-button'

export { addMovieBtn }
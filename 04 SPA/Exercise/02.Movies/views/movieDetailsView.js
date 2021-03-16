import { eFactory } from '../src/helper.js'

function movieDetailsView ({ title, img, description, _ownerId }, likesCount) {
	const isOwnMovie = _ownerId === sessionStorage.getItem('_id')

	const ownerButtons = `<a class="btn btn-danger" data-id="deleteMovieBtn" href="javascript:void(0)">Delete</a>
    <a class="btn btn-warning" data-id="editMovieBtn" href="javascript:void(0)">Edit</a>`

	const likeButton = `<a class="btn btn-primary" data-id="likeMovieBtn" href="javascript:void(0)">Like</a>`

	const innerHTML = `<div class="container">
<div class="row bg-light text-dark">
<h1>Movie title: ${title}</h1>
<div class="col-md-8">
    <img class="img-thumbnail" src=${img} alt="Movie">
</div>
<div class="col-md-4 text-center">
    <h3 class="my-3 ">Movie Description</h3>
    <p>${description}</p>
    ${isOwnMovie
		? ownerButtons
		: likeButton}
<span class="enrolled-span">Liked ${likesCount}</span>
</div>
</div>
</div>`

	const detailsSection = eFactory('section', '', innerHTML)
	detailsSection.id = 'movie-example'

	return detailsSection
}

export { movieDetailsView }
import { eFactory } from '../src/helper.js'


function getMovieComponent ({ img, title }) {
	const innerHTML = `<img class="card-img-top"
     src=${img}
     alt="Card image cap" width="400">
<div class="card-body">
    <h4 class="card-title">${title}</h4>
</div>
<div class="card-footer">
    <a href="#/details/CUtL9j4qI0XVhn9kTUsx">
        <button type="button" class="btn btn-info">Details</button>
    </a>
</div>`

	return eFactory('div', 'card mb-4', innerHTML)
}

export { getMovieComponent }


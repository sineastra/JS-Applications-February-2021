import { html, nothing } from '../node_modules/lit-html/lit-html.js'

const DetailsView = ({ title, img, description, _id, _ownerId }) => {

	return html`
        <div class="container home some">
            <img class="det-img" src="${img}"/>
            <div class="desc">
                <h2 class="display-5">${title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${description}</p>
            </div>
            ${_ownerId === sessionStorage.getItem('id') ? html`
                <div class="text-center">
                    <a class="btn detb" data-id="${_id}" href="javascript:void(0)">Delete</a>
                </div>` : nothing}
        </div>`
}

export { DetailsView }
import { html, nothing } from '../node_modules/lit-html/lit-html.js'

const DetailsView = ({ title, imageUrl, description, _id, _ownerId }) => {
	return html`
        <section id="meme-details">
            <h1>Meme Title: ${title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${description}
                    </p>
                    ${_ownerId === sessionStorage.getItem('id')
                            ? html`<a class="button warning" href="/edit/${_id}">Edit</a>
                            <button class="button danger" data-id="${_id}">Delete</button>`
                            : nothing}
                </div>
            </div>
        </section>`
}

export { DetailsView }
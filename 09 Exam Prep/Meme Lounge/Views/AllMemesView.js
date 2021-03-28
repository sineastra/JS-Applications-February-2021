import { html } from '../node_modules/lit-html/lit-html.js'

const SingleMemeComponent = ({ _id, title, imageUrl }) => {
	return html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${title}</p>
                    <img class="meme-image" alt="meme-img" src="${imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${_id}">Details</a>
                </div>
            </div>
        </div>`
}

const AllMemesView = (memes) => {
	return html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
                ${memes && memes.length !== 0
                        ? memes.map(SingleMemeComponent)
                        : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>`
}

export { AllMemesView }
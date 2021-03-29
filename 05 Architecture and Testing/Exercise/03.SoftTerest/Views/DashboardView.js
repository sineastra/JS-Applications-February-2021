import { html } from '../node_modules/lit-html/lit-html.js'

const IdeaCardComponent = ({ _id, title, img }) => {

	return html`
        <div class="card overflow-hidden current-card details"
             style="width: 20rem; height: 18rem;">
            <div class="card-body">
                <p class="card-text">${title}</p>
            </div>
            <img class="card-image" src="${img}" alt="Card image cap">
            <a class="btn" href="/details/${_id}">Details</a>
        </div>`
}

const DashboardView = (ideas) => {

	return html`
        <div id="dashboard-holder">
            ${ideas ? ideas.map(IdeaCardComponent) : html`<h1>No ideas yet! Be the first one
                :)</h1>`}
        </div>`
}

export { DashboardView }

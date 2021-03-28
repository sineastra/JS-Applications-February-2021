import { html, nothing } from '../node_modules/lit-html/lit-html.js'

const TeamComponent = ({ _id, logoUrl, name, description, membersCount }) => html`
    <article class="layout">
        <img src="${logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${name}</h2>
            <p>${description}</p>
            <span class="details">${membersCount} Member${membersCount === 1 ? nothing :'s'}</span>
            <div><a href=${`/details/${_id}`} class="action">See details</a></div>
        </div>
    </article>`

const BrowseView = (isUserLogged, teams) => html`
    <section id="browse">
        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>

        ${isUserLogged ? html`
            <article class="layout narrow">
                <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
            </article>` : nothing}

        ${teams.map(x => TeamComponent(x))}
    </section>`

export { BrowseView }
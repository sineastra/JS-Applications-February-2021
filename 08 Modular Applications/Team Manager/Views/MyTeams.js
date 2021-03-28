import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'

const MyTeamsView = context => {
	const NoTeamsComponent = html`
        <article class="layout narrow">
            <div class="pad-med">
                <p>You are not a member of any team yet.</p>
                <p><a href="#">Browse all teams</a> to join one, or use the button bellow to
                    cerate
                    your own
                    team.</p>
            </div>
            <div class=""><a href="/create" class="action cta">Create Team</a></div>
        </article>`

	const SingleTeamComponent = teamData => {
		const teamMembers = teamData.members.length

		return html`
            <article class="layout">
                <img src="./assets/rocket.png" class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${teamData.team.name}</h2>
                    <p>${teamData.team.desciption}</p>
                    <span class="details">${teamMembers} Member${teamMembers === 1
                            ? nothing
                            : 's'}</span>
                    <div><a href="#" class="action">See details</a></div>
                </div>
            </article>`
	}

	return html`
        <section id="my-teams">
            <article class="pad-med">
                <h1>My Teams</h1>
            </article>
            ${context.myTeams.length > 0
                    ? context.myTeams.map(x => SingleTeamComponent(x))
                    : NoTeamsComponent}
        </section>`
}

export { MyTeamsView }
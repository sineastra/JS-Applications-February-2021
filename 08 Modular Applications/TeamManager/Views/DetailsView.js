import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { teams } from '../requests/requests.js'
import { PageLayout } from '../Components/PageLayout.js'
import { contextAPI } from '../src/contextAPI.js'

const joinTeam = async (context, e) => {
	e.preventDefault()
	const response = await teams.becomeMember({ teamId: context.params.id })
	const updatedContext = await contextAPI.updateContext(context)
	updatedContext.memberId = response._id

	render(PageLayout(DetailsView(updatedContext)), document.getElementById('content'))
}

const cancelRequest = async (context, e) => {
	e.preventDefault()
	const memberId = e.target.dataset.memberId
	await teams.cancelRequest(memberId)
	const updatedContext = await contextAPI.updateContext(context)

	render(PageLayout(DetailsView(updatedContext)), document.getElementById('content'))
}

const approveRequest = async (context, user, e) => {
	e.preventDefault()
	await teams.approveRequest(user._id, { ...user, status: 'member' })
	const updatedContext = await contextAPI.updateContext(context)

	render(PageLayout(DetailsView(updatedContext)), document.getElementById('content'))
}

const TeamActionsComponent = (context) => {
	const isSomeoneLogged = sessionStorage.getItem('accessToken')
	const actions = {
		owner: () =>
			html`<a href="/edit/${context.params.id}" class="action">Edit team</a>`,

		guest: () =>
			html`<a href="javascript:void(0)"
                    @click=${(e) => joinTeam(context, e)}
                    class="action">Join team</a>`,

		pending: () => {
			const memberId = context.currentTeam.allMembers.find(x => x.user._id ===
				sessionStorage.getItem('id'))._id

			return html`Membership pending.
            <a href="javascript:void(0)"
               data-member-id="${memberId}"
               @click="${(e) => cancelRequest(context, e)}">Cancel request</a>`
		},

		member: () =>
			html`<a href="javascript:void(0)"
                    @click="${(e) => cancelRequest(context, e)}" class="action invert">Leave
                team</a>`
	}

	return isSomeoneLogged ? actions[context.ownershipStatus]() : nothing
}

const MembersComponent = (context) => {
	const isOwner = context.ownershipStatus === 'owner'
	const ownerIndex = context.members.findIndex(x => x.user._id ===
		context.currentTeam._ownerId)
	const [owner] = context.members.splice(ownerIndex, 1)

	const removeMemberBtn = memberId =>
		html`<a href="javascript:void(0)" data-member-id="${memberId}"
                class="tm-control action"
                @click="${(e) => cancelRequest(context, e)}">Remove from team</a>`

	const MemberComponent = (name, isOwner, memberId) =>
		html`
            <li>${name}${isOwner ? removeMemberBtn(memberId) : nothing}</li>`

	return html`
        <ul class="tm-members">
            ${MemberComponent(owner.user.username)}
            ${context.members.map(x => MemberComponent(x.user.username, isOwner, x._id))}
        </ul>`
}

const PendingRequestsComponent = context => {
	// single component for user APPROVE/DECLINE by the owner with all the handlers attached.
	const PendingSubComponent = user => html`
        <li>${user.user.username}<a href="javascript:void(0)"
                                    @click=${(e) => approveRequest(context, user, e)}
                                    class="tm-control action">Approve</a><a
                href="javascript:void(0)" class="tm-control action" data-member-id="${user._id}"
                @click="${(e) => cancelRequest(context, e)}">Decline</a></li>`


	// this component should be visible only if the current member is the owner!
	return context.ownershipStatus === 'owner'
		? html`
                <div class="pad-large">
                    <h3>Membership Requests</h3>
                    <ul class="tm-members">
                        ${context.pending.map(PendingSubComponent)}
                    </ul>
                </div>`
		: nothing
}

const DetailsView = context => html`
    <section id="team-home">
        <article class="layout">
            <img src="./assets/rocket.png" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${context.currentTeam.name}</h2>
                <p>${context.currentTeam.description}</p>
                <span class="details">${context.members.length} Members</span>
                <div>
                    ${TeamActionsComponent(context)}
                </div>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                ${MembersComponent(context)}
            </div>
            ${PendingRequestsComponent(context)}
        </article>
    </section>`


export { DetailsView }
import { createFormObject, saveUserInStorage } from '../src/helper.js'
import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { teams, user } from '../requests/requests.js'
import page from '../node_modules/page/page.mjs'
import { PageLayout } from '../Components/PageLayout.js'


const errors = {
	name: 'Name must be 4 or more characters',
	logoUrl: 'Logo URL is required',
	description: 'Description must be 10 or more characters',
}

const checkForValidInput = (formObj) => { // ADD FIELDS IF NEOBHODIMO HOHO
	const checks = {
		name: n => n.length >= 4,
		logoUrl: l => l !== '',
		description: d => d.length >= 10,
	}

	Object.entries(formObj).forEach(([key, value]) => {
		if (! checks[key](value)) {
			throw new Error(key)
		}
	})

	return true
}

const create = async (e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)

	try {
		checkForValidInput(formObject)

		const response = await teams.createTeam({
			name: formObject.name,
			logoUrl: formObject.logoUrl,
			description: formObject.description,
		})

		const creator = await teams.becomeMember({ teamId: response._id })
		await teams.approveRequest(creator._id, { ...creator, status: 'member' })

		page.redirect(`/details/${response._id}`)
	} catch (error) {
		render(PageLayout(CreateView(errors[error.message])), document.getElementById('content'))
	}
}

const CreateView = (context, errorMsg) => html`
    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form id="create-form" class="main-form pad-large" @submit="${create}">
                ${errorMsg ? html`
                    <div class="error">${errorMsg}</div>` : nothing}
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
    </section>`

export { CreateView }
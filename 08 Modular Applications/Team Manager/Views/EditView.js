import { createFormObject } from '../src/helper.js'
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

const update = async (context, e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)
	const teamId = context.params.id

	try {
		checkForValidInput(formObject)

		const response = await teams.updateTeam(teamId, {
			name: formObject.name,
			logoUrl: formObject.logoUrl,
			description: formObject.description
		})

		page.redirect(`/details/${teamId}`)
	} catch (error) {
		render(
			PageLayout(EditView(context, errors[error.message])),
			document.getElementById('content')
		)
	}
}

const EditView = (context, errorMsg) => {
	console.log(context)

	return html`
        <section id="edit">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Edit Team</h1>
                </header>
                <form id="edit-form" class="main-form pad-large"
                      @submit="${(e) => update(context, e)}">
                    ${errorMsg ? html`
                        <div class="error">${errorMsg}</div>` : nothing}
                    <label>Team name: <input type="text" name="name"
                                             .value="${context.team.name}"></label>
                    <label>Logo URL: <input type="text" name="logoUrl"
                                            .value="${context.team.logoUrl}"></label>
                    <label>Description: <textarea name="description"
                                                  .value="${context.team.description}"></textarea></label>
                    <input class="action cta" type="submit" value="Save Changes">
                </form>
            </article>
        </section>`
}

export { EditView }
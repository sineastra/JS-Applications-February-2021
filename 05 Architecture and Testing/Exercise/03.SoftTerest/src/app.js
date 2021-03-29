import page from '../node_modules/page/page.mjs'
import { renderView } from './helper.js'
import { HomeView } from '../Views/HomeView.js'
import { RegisterView } from '../Views/RegisterView.js'
import { LoginView } from '../Views/LoginView.js'
import { DashboardView } from '../Views/DashboardView.js'
import { contextAPI } from './contextAPI.js'
import { CreateIdeaView } from '../Views/CreateIdeaView.js'
import { ideas } from '../requests/requests.js'
import { DetailsView } from '../Views/DetailsView.js'

page('/', () => renderView(HomeView()))
page(
	'/dashboard',
	contextAPI.storeAllIdeas,
	(context) => renderView(DashboardView(context.allIdeas))
)
page('/details/:id', contextAPI.storeIdea, (context) => renderView(DetailsView(context.idea)))
page('/create', () => renderView(CreateIdeaView()))
page('/register', () => renderView(RegisterView()))
page('/login', () => renderView(LoginView()))
page()

document.addEventListener('click', async (e) => {
	if (e.target.tagName === 'A' && e.target.classList.contains('detb')) {
		e.preventDefault()
		await ideas.deleteIdea(e.target.dataset.id)

		page.redirect('/dashboard')
	}
})

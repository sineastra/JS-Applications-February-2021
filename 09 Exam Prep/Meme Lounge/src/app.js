import page from '../node_modules/page/page.mjs'
import { RegisterView } from '../Views/RegisterView.js'
import { LoginView } from '../Views/LoginView.js'
import { contextAPI } from './contextAPI.js'
import { AllMemesView } from '../Views/AllMemesView.js'
import { CreateView } from '../Views/CreateView.js'
import { DetailsView } from '../Views/DetailsView.js'
import { memes } from '../requests/requests.js'
import { EditView } from '../Views/EditView.js'
import { UserProfileView } from '../Views/UserProfileView.js'
import { renderView } from './helper.js'

page('/', contextAPI.pickHomePage, (context) => renderView(context.homePage()))
page('/register', () => renderView(RegisterView()))
page('/login', () => renderView(LoginView()))
page('/memes', contextAPI.storeAllMemes, (context) => renderView(AllMemesView(context.allMemes)))
page('/create', () => renderView(CreateView()))
page('/details/:id', contextAPI.storeMeme, (context) => renderView(DetailsView(context.meme)))
page('/edit/:id', contextAPI.storeMeme, (context) => renderView(EditView(context.meme)))
page('/profile', contextAPI.storeUserData, (context) => renderView(UserProfileView(context.user)))
page.start()

document.addEventListener('click', async (e) => {
	if (e.target.tagName === 'BUTTON' && e.target.classList.contains('danger')) {
		try {
			await memes.deleteMeme(e.target.dataset.id)

			page.redirect('/memes')
		} catch (e) {
			return alert(e.message)
		}
	}
})
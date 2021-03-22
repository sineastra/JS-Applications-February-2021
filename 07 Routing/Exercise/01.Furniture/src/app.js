import page from '//unpkg.com/page/page.mjs'
import { PageLayout } from '../Components/PageLayout.js'
import { Create } from '../Views/Create.js'
import { Dashboard } from '../Views/Dashboard.js'
import { Catalog } from '../Views/Catalog.js'
import { Details } from '../Views/Details.js'
import { Edit } from '../Views/Edit.js'
import { Login } from '../Views/Login.js'
import { MyFurniture } from '../Views/MyFurniture.js'
import { Register } from '../Views/Register.js'
import { user } from '../requests/requests.js'

const renderView = (view) => PageLayout(document.querySelector('body'), view)

page.redirect('/', '/dashboard')
page('/dashboard', () => renderView(Dashboard()))
page('/catalog', () => renderView(Catalog()))
page('/create', () => renderView(Create()))
page('/details', () => renderView(Details()))
page('/Edit', () => renderView(Edit()))
page('/Login', () => renderView(Login()))
page('/my-furniture', () => renderView(MyFurniture()))
page('/register', () => renderView(Register()))
page()

document.addEventListener('click', async e => {
	if (e.target.tagName === 'A' && e.target.id === 'logoutLink') {
		try {
			await user.logout()
		} catch (e) {
			console.log(e)
		}

		sessionStorage.clear()
		page.redirect('/dashboard')
	}
})
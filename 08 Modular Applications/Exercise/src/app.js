import { render } from '../node_modules/lit-html/lit-html.js'
import { PageLayout } from '../Components/PageLayout.js'
import page from '../node_modules/page/page.mjs'
import { HomeView } from '../Views/HomeView.js'
import { BrowseView } from '../Views/BrowseView.js'
import { contextAPI } from './contextAPI.js'
import { isUserLogged } from './helper.js'
import { RegisterView } from '../Views/RegisterView.js'
import { LoginView } from '../Views/LoginView.js'
import { CreateView } from '../Views/CreateView.js'
import { EditView } from '../Views/EditView.js'
import { DetailsView } from '../Views/DetailsView.js'
import { MyTeamsView } from '../Views/MyTeams.js'

const renderView = (view) => render(PageLayout(view), document.getElementById('content'))

page('/', () => renderView(HomeView()))
page('/register', () => renderView(RegisterView()))
page('/login', () => renderView(LoginView()))
page('/create', () => renderView(CreateView()))
page('/edit/:id', contextAPI.storeSingleTeam, (context) => renderView(EditView(context)))
page('/details/:id', contextAPI.storeDetails, (context) => renderView(DetailsView(context)))
page(
	'/browse',
	contextAPI.storeAllTeamsInfo,
	(context) => renderView(BrowseView(isUserLogged(), context.teams))
)
page('/myTeams', contextAPI.storeMyTeams, (context) => renderView(MyTeamsView(context)))

page()
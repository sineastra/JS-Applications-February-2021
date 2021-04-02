import page from '../node_modules/page/page.mjs'
import { renderView } from './helper.js'
import { HomePageView } from '../Views/HomePageView.js'
import { LoginView } from '../Views/LoginView.js'
import { RegisterView } from '../Views/RegisterView.js'
import { AllListingsView } from '../Views/AllListingsView.js'
import { contextAPI } from './contextAPI.js'
import { CreateListingView } from '../Views/CreateListingView.js'
import { DetailsView } from '../Views/DetailsView.js'
import { EditView } from '../Views/EditView.js'
import { MyListingsView } from '../Views/MyListingsView.js'
import { ByYearView } from '../Views/ByYearView.js'

page('/', () => renderView(HomePageView()))
page('/login', () => renderView(LoginView()))
page('/create', () => renderView(CreateListingView()))
page('/register', () => renderView(RegisterView()))

page('/all', contextAPI.loadAllListings,
	(context) => renderView(AllListingsView(context.allListings)))
page('/details/:id', contextAPI.storeListing,
	(context) => renderView(DetailsView(context.currentListing)))
page('/edit/:id', contextAPI.storeListing,
	(context) => renderView(EditView(context.currentListing)))
page('/byYear', contextAPI.storeSearchResults,
	(context) => renderView(ByYearView(context.searchResults, context.year)))
page('/myListings', contextAPI.storeUserListings,
	(context) => renderView(MyListingsView(context.userListings)))

page.start()
import page from '//unpkg.com/page/page.mjs'
import { render } from 'https://unpkg.com/lit-html?module'
import { PageLayout } from '../Components/PageLayout.js'
import { Create } from '../Views/Create.js'
import { Dashboard } from '../Views/Dashboard.js'
import { Catalog } from '../Views/Catalog.js'
import { Details } from '../Views/Details.js'
import { Edit } from '../Views/Edit.js'
import { Login } from '../Views/Login.js'
import { Register } from '../Views/Register.js'
import { context } from './contextAPI.js'

const renderView = (view) => render(PageLayout(view), document.querySelector('body'))

page.redirect('/', '/dashboard')
page(
	'/dashboard',
	context.storeAllFurniture,
	(context) => renderView(Dashboard(context.allFurniture))
)
page('/catalog', () => renderView(Catalog()))
page('/create', () => renderView(Create()))
page(
	'/details/:id',
	context.storeFurnitureItem,
	(context) => renderView(Details(context.currentItem))
)
page('/edit/:id', context.storeFurnitureItem, (context) => renderView(Edit(context.currentItem)))
page('/Edit', () => renderView(Edit()))
page('/Login', () => renderView(Login()))
page('/my-furniture', context.storeMyFurniture,
	(context) => renderView(Dashboard(context.myFurniture))
)
page('/register', () => renderView(Register()))
page()
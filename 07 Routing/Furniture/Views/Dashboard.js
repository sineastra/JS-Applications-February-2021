import { html } from 'https://unpkg.com/lit-html?module'
import { furniture } from '../requests/requests.js'
import { FurnitureCard } from '../Components/FurnitureCard.js'

const Dashboard = (items) => {
	document.title = 'Dashboard'

	return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Welcome to Furniture System</h1>
                    <p>Select furniture from the catalog to view details.</p>
                </div>
            </div>
            <div class="row space-top">
                ${items.map(x => FurnitureCard(x))}
            </div>`
}

export { Dashboard }
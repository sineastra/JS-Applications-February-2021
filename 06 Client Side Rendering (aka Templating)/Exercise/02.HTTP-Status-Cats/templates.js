import { LitElement, html } from 'https://unpkg.com/lit-element/lit-element.js?module'

class Cat extends LitElement {
	constructor (cat) {
		super()
		this.id = cat.id
		this.statusCode = cat.statusCode
		this.statusMessage = cat.statusMessage
		this.imageLocation = cat.imageLocation
		this.state = {
			display: 'none'
		}
	}

	changeVisibility = () => {
		const oldValue = this.state.display
		this.state.display === 'none' ? this.state.display = 'block' : this.state.display = 'none'

		this.requestUpdate(this.state.display, oldValue)
	}


	render () {
		return html`
            <img src="./images/${this.imageLocation}.jpg" width="250" height="250"
                 alt="Card image cap">
            <div class="info">
                <button class="showBtn" @click=${this.changeVisibility}>
                    Show status code
                </button>
                <div class="status" style="display: ${this.state.display}" id=${this.id}>
                    <h4>Status Code: ${this.statusCode}</h4>
                    <p>${this.statusMessage}</p>
                </div>
            </div>`
	}
	 n
}

customElements.define('cat-comp', Cat)

const catsComponent = cats => html`
    <ul>
        ${cats.map(x => html`
            <li>${new Cat(x)}</li>`)}
    </ul>`

export { catsComponent }
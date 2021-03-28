import { html } from '../node_modules/lit-html/lit-html.js'

const Notif = (msg) => {
	return html`
        <section id="notifications">
            <div id="errorBox" class="notification">
                <span>${msg}</span>
            </div>
        </section>`
}

export { Notif }
import { html } from 'https://unpkg.com/lit-html?module'

const townTemplate = (name) => html`
    <li>${name}</li>`

const townsTemplate = (townsNames) => html`
    <ul>
        ${townsNames.map(x => townTemplate(x))}
    </ul>`

export { townsTemplate }
import { html } from 'https://unpkg.com/lit-html?module'

const option = ({ text, _id }) => html`
    <option value=${_id}>${text}</option>`

const dropdownTemp = (options) => html`
    <h1>Dropdown Menu</h1>
    <article>
        <div>
            <select id="menu">
                ${options.map(x => option(x))}
            </select>
        </div>
        <form>
            <label for="itemText">
                Text:
            </label>
            <input type="text" id="itemText"/>
            <input type="submit" value="Add">
        </form>
    </article>`

export { dropdownTemp }
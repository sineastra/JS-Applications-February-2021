import { html } from 'https://unpkg.com/lit-html?module'

const thCell = (content) => html`
    <th>${content}</th>`

const tdCell = (content) => html`
    <td>${content}</td>`

const tableHeader = (heads) => html`
    <thead>
    <tr>
        ${heads.map(x => thCell(x))}
    </tr>
    </thead>`

const tableBody = (bodyData) => html`
    <tbody>
    ${bodyData.map(x => html`
        <tr>
            ${tdCell(`${x.firstName} ${x.lastName}`)}
            ${tdCell(x.email)}
            ${tdCell(x.course)}
        </tr>`)}
    </tbody>
`

const table = ({ headers, bodyData }) => html`
    <table class="container">
        ${tableHeader(headers)}
        ${tableBody(bodyData)}
        <tfoot>
        <tr>
            <td colspan="3">
                <input type="text" id="searchField"/>
                <button type="button" id="searchBtn">Search</button>
            </td>
        </tr>
        </tfoot>
    </table>`

export { table }
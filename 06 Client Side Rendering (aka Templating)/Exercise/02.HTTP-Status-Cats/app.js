import { cats } from './catSeeder.js'
import { render } from 'https://unpkg.com/lit-html?module'
import { catsComponent } from './templates.js'

render(catsComponent(cats), document.getElementById('allCats'))
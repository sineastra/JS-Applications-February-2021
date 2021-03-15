import { getNavBarLinks, eFactory } from '../src/helper.js'

const links = getNavBarLinks()

const createLink = (text) => `<li class="nav-item">
<a class="nav-link"href="javascript:void(0)">${text}</a>
</li>`

const navBar = eFactory('nav', 'navbar navbar-expand-lg navbar-dark bg-dark', `<a 
class='navbar-brand text-light' href='javascript:void(0)'>Movies</a>
<ul class="navbar-nav ml-auto">
${links.map(x => createLink(x)).join('')}
</ul>`)

export { navBar }
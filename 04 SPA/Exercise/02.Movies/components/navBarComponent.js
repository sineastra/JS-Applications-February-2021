import { getNavBarLinks, eFactory } from '../src/helper.js'

const createLink = (text) => `<li class="nav-item">
<a class="nav-link" data-id=${text.toLocaleLowerCase()} href="javascript:void(0)">${text}</a>
</li>`

const navBarComponent = () => eFactory('nav', 'navbar navbar-expand-lg navbar-dark bg-dark', `<a 
class='navbar-brand text-light' data-id="homeBtn" href='javascript:void(0)'>Movies</a>
<ul class="navbar-nav ml-auto">
${getNavBarLinks().map(x => createLink(x)).join('')}
</ul>`)

export { navBarComponent }
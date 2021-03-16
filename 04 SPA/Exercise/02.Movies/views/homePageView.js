import { eFactory } from '../src/helper.js'


const innerHTML = `<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
    <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
         class="img-fluid" alt="Responsive image" style="width: 150%; height: 200px">
    <h1 class="display-4">Movies</h1>
    <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
</div>`

const homePageView = eFactory('section', '', innerHTML)
homePageView.id = 'home-page'


export { homePageView }
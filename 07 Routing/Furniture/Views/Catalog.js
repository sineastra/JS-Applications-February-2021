import { html } from 'https://unpkg.com/lit-html?module'

const Catalog = () => {
	document.title = 'Catalog'

	return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Welcome to Furniture System</h1>
                    <p>Select furniture from the catalog to view details.</p>
                </div>
            </div>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src="../images/table.png"/>
                            <p>Description here</p>
                            <footer>
                                <p>Price: <span>235 $</span></p>
                            </footer>
                            <div>
                                <a href="#" class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src="../images/sofa.jpg"/>
                            <p>Description here</p>
                            <footer>
                                <p>Price: <span>1200 $</span></p>
                            </footer>
                            <div>
                                <a href="#" class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src="../images/chair.jpg"/>
                            <p>Description here</p>
                            <footer>
                                <p>Price: <span>55 $</span></p>
                            </footer>
                            <div>
                                <a href="#" class="btn btn-info">Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}

export { Catalog }
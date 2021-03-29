import { html } from '../node_modules/lit-html/lit-html.js'
import { createFormObject } from '../src/helper.js'
import page from '../node_modules/page/page.mjs'
import { ideas } from '../requests/requests.js'

const errors = {
	title: 'The title should be at least 6 characters long',
	description: 'The description should be at least 10 characters long',
	imageURL: 'The image should be at least 5 characters long',
}

const checkForValidInput = (formObj) => {
	const checks = {
		title: (title) => title.length >= 6,
		description: (d) => d.length >= 10,
		imageURL: (i) => i.length >= 5,
	}

	Object.entries(formObj).forEach(([key, value]) => {
		if (! checks[key](value, formObj.password)) {
			throw new Error(key)
		}
	})

	return true
}

const createIdea = async (e) => {
	e.preventDefault()
	const formObject = createFormObject(e.target)

	try {
		checkForValidInput(formObject)

		console.log(formObject)
		await ideas.createIdea({
			title: formObject.title,
			description: formObject.description,
			img: formObject.imageURL
		})

		page.redirect('/dashboard')
	} catch (error) {
		return alert(errors[error.message])
		// showNotification(RegisterView, errors[error.message])
	}
}

const CreateIdeaView = () => {

	return html`
        <div class="container home wrapper  my-md-5 pl-md-5">
            <div class=" d-md-flex flex-mb-equal ">
                <div class="col-md-6">
                    <img class="responsive-ideas create" src="./images/creativity_painted_face.jpg"
                         alt="">
                </div>
                <form class="form-idea col-md-5" @submit="${createIdea}">
                    <div class="text-center mb-4">
                        <h1 class="h3 mb-3 font-weight-normal">Share Your Idea</h1>
                    </div>
                    <div class="form-label-group">
                        <label for="ideaTitle">Title</label>
                        <input type="text" id="title" name="title" class="form-control"
                               placeholder="What is your idea?"
                               required="" autofocus="">
                    </div>
                    <div class="form-label-group">
                        <label for="ideaDescription">Description</label>
                        <textarea type="text" name="description" class="form-control"
                                  placeholder="Description"
                                  required=""></textarea>
                    </div>
                    <div class="form-label-group">
                        <label for="inputURL">Add Image</label>
                        <input type="text" id="imageURl" name="imageURL" class="form-control"
                               placeholder="Image URL"
                               required="">

                    </div>
                    <button class="btn btn-lg btn-dark btn-block" type="submit">Create</button>

                    <p class="mt-5 mb-3 text-muted text-center">© SoftTerest - 2021.</p>
                </form>
            </div>
        </div>`
}

export { CreateIdeaView }
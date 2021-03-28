import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { createFormObject, showNotification } from '../src/helper.js'
import { memes } from '../requests/requests.js'
import { PageLayout } from '../Components/PageLayout.js'
import { LoginView } from './LoginView.js'
import { Notif } from '../Components/Notif.js'

const createMeme = async (e) => {
	e.preventDefault()
	const formData = createFormObject(e.target)

	if (Object.values(formData).every(x => x !== '')) {
		await memes.createMeme(formData)

		page.redirect('/memes')
	} else {
		showNotification(CreateView, 'All fields are required')
	}
}

const CreateView = (errorMsg) => {
	return html`
        <section id="create-meme">
            <form id="create-form" @submit="${createMeme}">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description"
                              name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl"
                           name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
        ${errorMsg ? Notif(errorMsg) : nothing}`
}

export { CreateView }
import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { createFormObject, showNotification } from '../src/helper.js'
import { memes } from '../requests/requests.js'
import page from '../node_modules/page/page.mjs'
import { PageLayout } from '../Components/PageLayout.js'
import { LoginView } from './LoginView.js'
import { Notif } from '../Components/Notif.js'

const updateMeme = async (id, e) => {
	e.preventDefault()
	const formData = createFormObject(e.target)

	if (Object.values(formData).every(x => x !== '')) {
		await memes.updateMeme(id, formData)

		page.redirect('/memes')
	} else {
		showNotification((msg) => EditView(formData, msg), 'All fields are required')
	}
}

const EditView = ({ title, description, imageUrl, _id, }, errorMsg) => {
	return html`
        <section id="edit-meme">
            <form id="edit-form" @submit="${(e) => updateMeme(_id, e)}">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title"
                           .value="${title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description"
                              name="description">${description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl"
                           name="imageUrl" .value="${imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
        ${errorMsg ? Notif(errorMsg) : nothing}`
}

export { EditView }
import { html } from '../node_modules/lit-html/lit-html.js'

const SingleMemeComponent = ({ title, imageUrl, _id }) => html`
    <div class="user-meme">
        <p class="user-meme-title">${title}</p>
        <img class="userProfileImage" alt="meme-img" src="${imageUrl}">
        <a class="button" href="/details/${_id}">Details</a>
    </div>`

const UserProfileView = ({ username, email, memes, gender }) => {
	return html`
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile"
                     src="${gender === 'female' ? '/images/female.png' : '/images/male.png'}">
                <div class="user-content">
                    <p>Username: ${username}</p>
                    <p>Email: ${email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${memes.length !== 0
                        ? memes.map(SingleMemeComponent)
                        : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>`
}

export { UserProfileView }
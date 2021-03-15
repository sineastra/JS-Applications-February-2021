import { createTopic, getComments, getPosts, postComment } from './requests.js'
import { createCommentsElement, createPostsElement } from './display.js'
import { isValidData, clearFormFields } from './helper.js'

const main = document.querySelector('main')
const displayPosts = createPostsElement.bind(undefined, main)
const displayComments = createCommentsElement.bind(undefined, main)
let post = ''

// initial rendering of the posts and the post form
displayPosts(await getPosts())

// add event listener for both 'postForm' and 'commentForm' directly on the document
document.addEventListener('submit', async e => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const deserializedData = Object.fromEntries([...formData.entries()])

	const forms = {
		'postForm': async e => {
			if (e.submitter.className === 'public') {
				// if all fields are not empty:
				if (isValidData(deserializedData)) {
					// sending fetch with method POST to create post in DataBase:
					await createTopic(deserializedData, Date.now())
					// re-rendering of all posts with new data:
					displayPosts(await getPosts())
				} else {
					alert('Missing fields!')
					return
				}
			}

			// clearing input fields
			clearFormFields(e.target)
		},
		'commentForm': async () => {
			// creating new comment in DataBase with extra fields: creationDate and the post
			// the comment is about. It is by post name so if 2 posts have the same name
			// the comments will be shared. Can implement by ID but not worth extra work:
			await postComment({ ...deserializedData, creationDate: Date.now() }, post.topicName)
			// re-rendering of comments
			displayComments(post, await getComments(post.topicName))
		}
	}

	// execute form action by submit form ID
	forms[e.target.id](e)
})

document.addEventListener('click', async e => {
	if (e.target.tagName === 'H2' && e.path[1].className === 'normal') {
		// on clicking post field in main page we need to display all comments about it.
		// we take the post name, send GET http request to DB, get all the data about the post
		// we need and pass it as argument to displayComments, while storing the post itself in
		// global module variable for use in the .addEventListener
		const postName = e.target.textContent
		const posts = await getPosts()
		post = posts.find(x => x.topicName === postName)
		const comments = await getComments(postName)

		displayComments(post, comments)
	}
	if (e.target.tagName === 'A' && e.target.textContent === 'Home') {
		displayPosts(await getPosts())
	}
})

// can be refactored much more but there are more important things to learn than
// further refactoring this At This Very Moment..
// this is done before routing and templating lectures so not implementing any of these
// TODO: further refactor
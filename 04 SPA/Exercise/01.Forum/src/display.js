import { eFactory } from './helper.js'

//the view HTML templates.

function formTemplate () {
	const innerHTML = `<div class="header-background">
<span>New Topic</span>
</div>
<form id="postForm">
    <div class="new-topic-title">
        <label for="topicName">Title <span class="red">*</span></label>
        <input type="text" name="topicName" id="topicName">
    </div>
    <div class="new-topic-title">
        <label for="username">Username <span class="red">*</span></label>
        <input type="text" name="username" id="username">
    </div>
    <div class="new-topic-content">
        <label for="postText">Post <span class="red">*</span></label>
        <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
    </div>
    <div class="new-topic-buttons">
        <button class="cancel">Cancel</button>
        <button class="public">Post</button>
    </div>
</form>`

	return eFactory('div', 'new-topic-border', innerHTML)
}

function singlePostTemplate ({ topicName, creationDate, username, _id, }) {
	const date = new Date(creationDate)
	const innerHTML = `<div class="topic-name-wrapper">
<div class="topic-name">
<a href="javascript:void(0)" class="normal">
<h2>${topicName}</h2>
</a>
<div class="columns">
<div>
<p>Date:
<time>${date.toLocaleString()}</time>
</p>
<div class="nick-name">
<p>Username: <span>${username}</span></p>
</div>
</div>
<div class="subscribers">
<!-- <button class="subscribe">Subscribe</button> -->
<p>Subscribers: <span></span></p>
</div>
</div>
</div>
</div>`
	const post = eFactory('div', 'topic-container', innerHTML)
	post.id = _id

	return post
}

function commentPostTemplate ({ topicName, creationDate }) {
	const date = new Date(creationDate)
	const innerHTML = `<div class="topic-title">
<div class="topic-name-wrapper">
    <div class="topic-name">
        <h2>${topicName}</h2>
        <p>Date: <time>${date.toLocaleString()}</time></p>
    </div>
    <div class="subscribers">
        <p>Subscribers: <span></span></p>
    </div>
</div>`

	return eFactory('div', 'topic-content', innerHTML)
}

function singleCommentTemplate ({ username, postText, creationDate }) {
	const date = new Date(creationDate)
	const innerHTML = `<header class="header">
<p><span>${username}</span> posted on <time>${date.toLocaleString()}</time></p>
</header>
<div class="comment-main">
    <div class="userdetails">
        <img src="./static/profile.png" alt="avatar">
    </div>
    <div class="post-content">
        <p>${postText}</p>
    </div>
</div>
<div class="footer">
    <p><span>NO</span> likes functionality yet..Sowwy</p>
</div>`

	return eFactory('div', 'comment', innerHTML)
}

function addCommentForm () {
	const innerHTML = `<p><span>currentUser</span> comment:</p>
<div class="answer">
    <form id="commentForm">
        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
        <div>
            <label for="username">Username <span class="red">*</span></label>
            <input type="text" name="username" id="username">
        </div>
        <button>Post</button>
    </form>
</div>`

	return eFactory('div', 'answer-comment', innerHTML)
}

function createPostsElement (parent, postsData) {
	const wrapper = eFactory('div', 'topic-title')

	postsData.forEach(x => wrapper.appendChild(singlePostTemplate(x)))

	parent.innerHTML = `${formTemplate().outerHTML}
${wrapper.outerHTML}`

}

function createCommentsElement (parent, postData, commentsData) {
	const commentPost = commentPostTemplate(postData)

	commentsData.forEach(x => commentPost.appendChild(singleCommentTemplate(x)))

	parent.innerHTML = `${commentPost.outerHTML}
${addCommentForm().outerHTML}`

}

export { createPostsElement, createCommentsElement }
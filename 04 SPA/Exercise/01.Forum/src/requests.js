async function createTopic (data, date) {
	const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...data, creationDate: date })
	})

	return await response.json()
}

async function getPosts () {
	const topicsResponse = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
	const data = await topicsResponse.json()

	return Object.values(data)
}

async function getComments (topicName) {
	const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments')
	const data = await response.json()
	const comments = Object.values(data).filter(x => x.topicName === topicName)

	return comments
}

async function postComment (data, topicName) {
	const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ ...data, topicName })
	})
}

export { createTopic, getPosts, getComments, postComment }
import { fetches } from './backendAPI.js'

const user = {
	register: (body) => fetches.post('users/register', body),
	login: (body) => fetches.post('users/login', body),
	logout: () => fetches.get('users/logout'),
}

const memes = {
	getAllMemes: () => fetches.get(`/data/memes?sortBy=_createdOn%20desc`),
	createMeme: ({ title, description, imageUrl }) => fetches.post(
		`/data/memes`,
		{ title, description, imageUrl }
	),
	getMeme: (id) => fetches.get(`/data/memes/${id}`),
	deleteMeme: (memeId) => fetches.delete(`/data/memes/${memeId}`),
	updateMeme: (memeId, body) => fetches.put(`/data/memes/${memeId}`, body),
	getAllUserMemes: (userId) => fetches.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export { user, memes }
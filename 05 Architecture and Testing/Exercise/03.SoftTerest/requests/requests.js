import { fetches } from './backendAPI.js'

const user = {
	register: (body) => fetches.post('users/register', body),
	login: (body) => fetches.post('users/login', body),
	logout: () => fetches.get('users/logout'),
}

const ideas = {
	getAllIdeas: () => fetches.get('/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc'),
	createIdea: ({ title, description, img }) => fetches.post(
		'/data/ideas',
		{ title, description, img }
	),
	getIdea: (id) => fetches.get(`/data/ideas/${id}`),
	deleteIdea: (id) => fetches.delete(`/data/ideas/${id}`),
}

export { user, ideas }
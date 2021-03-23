import { fetches } from './backendAPI.js'

const user = {
	register: (body) => fetches.post('users/register', body),
	login: (body) => fetches.post('users/login', body),
	logout: () => fetches.get('users/logout'),
}

const furniture = {
	create: (body) => fetches.post('data/catalog', body),
	getAll: () => fetches.get('data/catalog'),
	details: (id) => fetches.get(`data/catalog/${id}`),
	update: (body, id) => fetches.put(`data/catalog/${id}`, body),
	delete: (id) => fetches.delete(`data/catalog/${id}`),
	my: (id) => fetches.get(`data/catalog?where=_ownerId%3D%22${id}%22`),
}

export { user, furniture }
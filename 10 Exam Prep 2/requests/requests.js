import { fetches } from './backendAPI.js'

const user = {
	register: (body) => fetches.post('users/register', body),
	login: (body) => fetches.post('users/login', body),
	logout: () => fetches.get('users/logout'),
}

const cars = {
	getAllListings: () => fetches.get('/data/cars?sortBy=_createdOn%20desc'),
	createListing: ({
			brand,
			model,
			description,
			year,
			imageUrl,
			price
		}
	) => fetches.post('/data/cars', {
			brand,
			model,
			description,
			year,
			imageUrl,
			price
		}
	),
	updateListing: (id, {
			brand,
			model,
			description,
			year,
			imageUrl,
			price
		}
	) => fetches.put(`/data/cars/${id}`, {
			brand,
			model,
			description,
			year,
			imageUrl,
			price
		}
	),
	getCurrentListing: (id) => fetches.get(`/data/cars/${id}`),
	deleteListing: (id) => fetches.delete(`/data/cars/${id}`),
	getSearchResults: (year) => fetches.get(`/data/cars?where=year%3D${year}`),
	getUserListings: (userId) => fetches.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`),
}

export { user, cars }
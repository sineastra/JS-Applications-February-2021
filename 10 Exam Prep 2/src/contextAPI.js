import { cars, user } from '../requests/requests.js'

const contextAPI = {
	loadAllListings: async (context, next) => {
		context.allListings = await cars.getAllListings()
		next()
	},
	storeListing: async (context, next) => {
		context.currentListing = await cars.getCurrentListing(context.params.id)
		next()
	},
	storeUserListings: async (context, next) => {
		const userId = sessionStorage.getItem('id')
		context.userListings = await cars.getUserListings(userId)
		next()
	},
	storeSearchResults: async (context, next) => {
		console.log(context)
		const year = context.querystring === '' ? '' : context.querystring.split('=')[1] || ''
		context.searchResults = year !== '' ? await cars.getSearchResults(year) : []
		context.year = year
		next()
	}
}

export { contextAPI }
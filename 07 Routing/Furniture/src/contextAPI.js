import { furniture } from '../requests/requests.js'

const context = {
	storeAllFurniture: async (context, next) => {
		context.allFurniture = await furniture.getAll()
		next()
	},
	storeFurnitureItem: async (context, next) => {
		context.currentItem = await furniture.details(context.params.id)
		context.currentItem.isOwn = context.currentItem._ownerId === sessionStorage.getItem('id')
		next()
	},
	storeMyFurniture: async (context, next) => {
		const myId = sessionStorage.getItem('id')
		context.myFurniture = await furniture.my(myId)
		next()
	}
}

export { context }
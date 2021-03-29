import { ideas } from '../requests/requests.js'

const contextAPI = {
	storeAllIdeas: async (context, next) => {
		context.allIdeas = await ideas.getAllIdeas()
		next()
	},
	storeIdea: async (context, next) => {
		context.idea = await ideas.getIdea(context.params.id)
		next()
	}
}


export { contextAPI }
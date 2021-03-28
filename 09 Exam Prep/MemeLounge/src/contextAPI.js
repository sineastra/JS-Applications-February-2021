import { GuestHomeView } from '../Views/GuestHomeView.js'
import { AllMemesView } from '../Views/AllMemesView.js'
import { memes } from '../requests/requests.js'

const contextAPI = {
	pickHomePage: async (context, next) => {
		const allMemes = await memes.getAllMemes()

		context.homePage = sessionStorage.getItem('accessToken')
			? () => AllMemesView(allMemes)
			: GuestHomeView

		next()
	},
	storeAllMemes: async (context, next) => {
		context.allMemes = await memes.getAllMemes()
		next()
	},
	storeMeme: async (context, next) => {
		context.meme = await memes.getMeme(context.params.id)
		next()
	},
	storeUserData: async (context, next) => {
		context.user = {
			email: sessionStorage.getItem('email'),
			username: sessionStorage.getItem('username'),
			gender: sessionStorage.getItem('gender'),
			memes: await memes.getAllUserMemes(sessionStorage.getItem('id'))
		}
		next()
	}
}

export { contextAPI }
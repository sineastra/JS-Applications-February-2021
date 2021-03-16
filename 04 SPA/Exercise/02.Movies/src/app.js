import { createPageLayout, applyPageLayout } from './createPageLayout.js'
import { loginView } from '../views/loginView.js'
import {
	deserializeFormData,
	isValidInput,
	clearFormFields,
	checkServerError,
	parseMovieData
} from './helper.js'
import {
	addLike,
	createMovie, getIfUserLikedMovie,
	getMovieData, getMovieLikesNumber,
	loginRequest,
	logoutRequest,
	registerRequest, removeLike, updateMovie, deleteMovie
} from './requests.js'
import { registerView } from '../views/registerView.js'
import { getHomePageView } from '../views/homePageView.js'
import { addMovieView } from '../views/addMovieView.js'
import { movieDetailsView } from '../views/movieDetailsView.js'
import { editMovieView } from '../views/editMovieView.js'

const mainContainer = document.getElementById(`container`)
const displayPage = applyPageLayout.bind(undefined, mainContainer)

// initial rendering of guest home page
displayPage(createPageLayout(await getHomePageView()))

// function for registering and login since they are the same with validation exception.
// validation difference is handled in helper module
// checks if inputs are valid and server response is OK, then displays home page again
async function loginLogic (formType, request, data, form) {
	const response = await request(data)

	if (isValidInput(formType, data) && checkServerError(response)) {
		displayPage(createPageLayout(await getHomePageView()))
		clearFormFields(form)
	}
}

const login = loginLogic.bind(undefined, 'login', loginRequest)
const register = loginLogic.bind(undefined, 'register', registerRequest)

document.addEventListener('click', e => {
	// BUTTONS ACTIONS
	const buttonsActions = {
		homeBtn: async () => displayPage(createPageLayout(await getHomePageView())),
		addMovieBtn: () => displayPage(createPageLayout(addMovieView)),
		login: () => displayPage(createPageLayout(loginView)),
		register: () => displayPage(createPageLayout(registerView)),
		logout: async () => {
			await logoutRequest()
			sessionStorage.clear()
			displayPage(createPageLayout(await getHomePageView()))
		},
		movieDetailsBtn: async () => {
			// when we create movie we put the movie id on the button as
			// data-movie-id for easier capturing
			const movieId = e.target.dataset['movieId']
			const movieData = await getMovieData(movieId)
			const likesCount = await getMovieLikesNumber(movieId)

			// with the lack of context we gotta put the movie obj in session storage
			sessionStorage.setItem('movieData', JSON.stringify(movieData))

			displayPage(createPageLayout(movieDetailsView(movieData, likesCount)))
		},
		likeMovieBtn: async () => {
			// on pressing like btn we take both user ID and movie ID from the session storage
			// we pass them on AJAX request that checks if in likes collection there is
			// like with user: the currentUser, which returns array... Dont ask me tho, its not my
			// service. If there is element in the array, we remove it -> user unliked the movie
			// if there is no like we put a like -> user liked the movie
			// then we fetch the movie data and likes count again and display them fresh.
			// it could be done with context and caches but. Not this time.
			const movieId = parseMovieData()._id
			const ownerId = sessionStorage.getItem('_id')
			const likeArray = await getIfUserLikedMovie(movieId, ownerId)
			const like = likeArray[0]

			like
				? await removeLike(like._id)
				: await addLike({ movieId, ownerId })

			const movieData = await getMovieData(movieId)
			const likesCount = await getMovieLikesNumber(movieId)

			displayPage(createPageLayout(movieDetailsView(movieData, likesCount)))
		},
		editMovieBtn: async () => displayPage(createPageLayout(editMovieView(parseMovieData()))),
		deleteMovieBtn: async () => {
			await deleteMovie(parseMovieData()._id)

			displayPage(createPageLayout(await getHomePageView()))
		}
	}

	if ((e.target.tagName === 'BUTTON' || e.target.tagName === 'A') && e.target.type !== 'submit') {
		buttonsActions[e.target.dataset.id]()
	} else {
		e.preventDefault()
		const data = deserializeFormData(e.target)

		// SUBMIT ACTIONS
		const forms = {
			'loginForm': () => login(data, e.target),
			'registerForm': () => register(data, e.target),
			'addMovieForm': async () => {
				if (isValidInput('addMovie', data)) {
					await createMovie(data)

					displayPage(createPageLayout(await getHomePageView()))
				}
			},
			'editMovieForm': async () => {
				if (isValidInput('addMovie', data)) {
					await updateMovie(data, parseMovieData()._id)

					displayPage(createPageLayout(await getHomePageView()))
				}
			}
		}

		forms[e.target.dataset.id]()
	}
})
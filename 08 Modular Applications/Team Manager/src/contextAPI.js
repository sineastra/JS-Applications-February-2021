import { teams } from '../requests/requests.js'

const updateContext = async (context) => {
	const myId = sessionStorage.getItem('id')
	const teamId = context.params.id
	const [currentTeam, allTeamMembers] = await Promise.all([
		teams.getTeam(teamId),
		teams.getAllTeamMembers(teamId),
	])
	const getOwnershipStatus = () => {
		if (myId === currentTeam._ownerId) {
			return 'owner'
		}
		const member = allTeamMembers.find(x => x.user._id === myId)
		if (member) {
			return member.status
		}

		return 'guest'
	}

	context.currentTeam = currentTeam
	context.currentTeam.allMembers = allTeamMembers
	context.ownershipStatus = getOwnershipStatus()
	context.members = allTeamMembers.filter(x => x.status === 'member')
	context.pending = allTeamMembers.filter(x => x.status === 'pending')

	return context
}


const contextAPI = {
	storeAllTeamsInfo: async (context, next) => {
		let teamsInfo = await teams.getAll()
		teamsInfo = teamsInfo.map(x => ({ ...x, membersCount: 0 }))
		const allMembers = await teams.getAllMembers()

		teamsInfo.forEach(x => x.membersCount = allMembers.filter(y => y.teamId === x._id).length)
		context.teams = teamsInfo
		next()
	},
	storeSingleTeam: async (context, next) => {
		context.team = await teams.getTeam(context.params.id)
		next()
	},
	storeDetails: async (context, next) => {
		context = await updateContext(context)
		next()
	},
	updateContext,
	storeMyTeams: async (context, next) => {
		const [myTeams, allMembers] = await Promise.all([
			teams.getAllTeamsOfUser(sessionStorage.getItem('id')),
			teams.getAllMembers(),
		])
		context.myTeams =
			myTeams.map(x => ({ ...x, members: allMembers.filter(y => y.teamId === x.team._id) }))
		next()
	}
}

export { contextAPI }
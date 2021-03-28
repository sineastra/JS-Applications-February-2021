import { fetches } from './backendAPI.js'

const user = {
	register: (body) => fetches.post('users/register', body),
	login: (body) => fetches.post('users/login', body),
	logout: () => fetches.get('users/logout'),
}

const teams = {
	getAll: () => fetches.get('/data/teams'),
	getAllMembers: () => fetches.get('/data/members?where=status%3D%22member%22'),
	createTeam: (body) => fetches.post('/data/teams', body),
	updateTeam: (id, body) => fetches.put(`/data/teams/${id}`, body),
	getTeam: (id) => fetches.get(`/data/teams/${id}`),
	becomeMember: body => fetches.post('/data/members', body),
	cancelRequest: id => fetches.delete(`/data/members/${id}`),
	approveRequest: (id, body) => fetches.put(`/data/members/${id}`, body),
	getAllTeamMembers: (teamId) => fetches.get(`/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`),
	getAllTeamsOfUser: (userId) => fetches.get(`/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
}

export { user, teams }
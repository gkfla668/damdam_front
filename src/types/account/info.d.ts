interface IUserToPublic {
	id: string
	name: string
}

interface IUserToAuth {
	id: string
	role: UserRole
	accessToken: string
	refreshToken: string
}

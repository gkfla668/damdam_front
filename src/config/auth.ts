export default {
	meEndpoint: '/@api/auth/token/login',
	refreshEndpoint: '/@api/auth/token/refresh',
	loginEndpoint: '/@api/auth/login',
	registerEndpoint: '/@api/auth/register',
	storageTokenKeyName: 'accessToken',
	onTokenExpiration: 'refreshToken', // logout | refreshToken
}

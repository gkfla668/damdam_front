import axios from 'axios'

// ** Config
import authConfig from 'config/auth'

export const setToken = (token: string) => localStorage.setItem(authConfig.storageTokenKeyName, token)
export const getToken = () => typeof window !== 'undefined' && localStorage.getItem(authConfig.storageTokenKeyName)
export const removeToken = () => localStorage.removeItem(authConfig.storageTokenKeyName)
export const setRefreshToken = (token: string) => localStorage.setItem(authConfig.onTokenExpiration, token)
export const getRefreshToken = () => localStorage.getItem(authConfig.onTokenExpiration)
export const removeRefreshToken = () => localStorage.removeItem(authConfig.onTokenExpiration)

const api = process.env.NEXT_PUBLIC_API_URL
const axiosClient = axios.create()
axiosClient.defaults.baseURL = api

type headers = {
	'Content-Type': string
	Accept: string
	Authorization: string
}

export interface DataResponse {
	msg?: string
	data: any
}

export interface ErrorResponse {
	msg: string
	errors?: {
		message?: string
		error: any
	}
}

axiosClient.defaults.headers.head = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
} as headers

axiosClient.interceptors.request.use(
	(config) => {
		const token = getToken()
		if (token) config.headers!['Authorization'] = `Bearer ${token}`

		return config
	},
	(error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
	(res) => res,
	async (err) => {
		const originalConfig = err.config
		const isNotLogin = err.response && originalConfig.url !== authConfig.loginEndpoint
		const isNotAuthencitation = err.response.status === 401 && !originalConfig._retry

		if (isNotLogin && isNotAuthencitation) {
			originalConfig._retry = true

			removeToken()
			removeRefreshToken()

			return Promise.reject(err)
		}

		return Promise.reject(err)
	},
)

export default axiosClient

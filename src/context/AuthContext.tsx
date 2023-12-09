// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'
import { toast } from 'react-toastify'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios, { ErrorResponse, removeRefreshToken, removeToken, setRefreshToken, setToken } from 'utils/axiosInstance'

// ** Config
import authConfig from 'config/auth'

// ** Types
type ErrCallbackType = (err: { [key: string]: string }) => void
type LoginParams = {
	identity: string
	password: string
}
type RegisterParams = {
	identity: string
	password: string
}

type UserDataType = {
	id: string
	name: string
}

type AuthValuesType = {
	//-state
	user: UserDataType | null
	setUser: (value: UserDataType | null) => void
	loading: boolean
	setLoading: (value: boolean) => void
	//-function
	login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
	register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
	logout: () => void
}

// ** Defaults
const defaultProvider: AuthValuesType = {
	user: null,
	loading: true,
	setUser: () => null,
	setLoading: () => Boolean,
	login: () => Promise.resolve(),
	register: () => Promise.resolve(),
	logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	// ** States
	const [user, setUser] = useState<any>(defaultProvider.user)
	const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

	// ** Hooks
	const router = useRouter()

	useEffect(() => {
		const initAuth = async (): Promise<void> => {
			const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
			if (storedToken) {
				setLoading(true)
				await axios
					.post(authConfig.meEndpoint)
					.then(async (response) => {
						const { data } = response.data
						delete data.accessToken
						delete data.refreshToken

						setLoading(false)
						setUser(data)
					})
					.catch(() => {
						localStorage.removeItem('userData')
						localStorage.removeItem('refreshToken')
						localStorage.removeItem('accessToken')
						setUser(null)
						setLoading(false)
						if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
							router.replace('/auth/login')
						}
					})
			} else {
				setLoading(false)
			}
		}

		initAuth()
	}, [])

	const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
		axios
			.post(authConfig.loginEndpoint, params)
			.then(async (response) => {
				const { data } = response.data
				const { accessToken, refreshToken } = data

				setToken(accessToken)
				setRefreshToken(refreshToken)

				delete data.accessToken
				delete data.refreshToken
				const returnUrl = router.query.returnUrl

				setUser(data)
				window.localStorage.setItem('userData', JSON.stringify(data))

				const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
				router.replace(redirectURL as string)
			})
			.catch((err) => {
				if (err.response?.data?.msg) toast.error(err.response?.data?.msg)
				if (errorCallback) {
					const data: ErrorResponse = err.response?.data || {}
					errorCallback(data?.errors?.error)
				}
			})
	}
	const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
		axios
			.post(authConfig.registerEndpoint, params)
			.then(async (response) => {
				const { data } = response.data
				const { accessToken, refreshToken } = data

				setToken(accessToken)
				setRefreshToken(refreshToken)

				delete data.accessToken
				delete data.refreshToken
				const returnUrl = router.query.returnUrl

				setUser(data)
				window.localStorage.setItem('userData', JSON.stringify(data))

				const redirectURL = '/'
				router.replace(redirectURL as string)
			})
			.catch((err) => {
				if (err.response?.data?.msg) toast.error(err.response?.data?.msg)
				if (errorCallback) {
					const data: ErrorResponse = err.response?.data || {}
					errorCallback(data?.errors?.error)
				}
			})
	}

	const handleLogout = () => {
		setUser(null)
		removeToken()
		removeRefreshToken()
		window.localStorage.removeItem('userData')
		router.push('/login')
	}

	const values = {
		user,
		loading,
		setUser,
		setLoading,
		login: handleLogin,
		register: handleRegister,
		logout: handleLogout,
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

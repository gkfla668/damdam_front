import axios from 'utils/axiosInstance'
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './type'

const slicer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SET_INFO: (state, action) => {
			state.info = action.payload.data
			state.msg = action.payload.msg
			state.status = 'finish'
		},
		SET_DATA_LIST: (state, action) => {
			if (action.payload.page) state.data = (state.data || []).concat(action.payload.data)
			else state.data = action.payload.data
			state.count = action.payload.count
			state.page = action.payload.page
			state.totalPages = action.payload.totalPages
			state.msg = action.payload.msg
			state.status = 'finish'
		},
		SET_DASHBOARD: (state, action) => {
			state.dashboard = action.payload.data
			state.msg = action.payload.msg
			state.status = 'finish'
		},

		// CRUD
		ADD_ONE: (state, action) => {
			state.status = 'add'
			state.msg = action.payload.msg
			state.info = action.payload.data
		},
		UPDATE_ONE: (state, action) => {
			state.status = 'update'
			state.msg = action.payload.msg
			state.info = action.payload.data
		},
		DELETE_ONE: (state, action) => {
			state.status = 'delete'
			state.msg = action.payload.msg
			state.info = initialState.info
		},

		// Join
		JOIN: (state) => {
			state.status = 'join'
		},
		PASSWORD: (state) => {
			state.status = 'password'
		},

		// INIT & Status update
		INIT: (state) => {
			state.info = initialState.info
			state.status = initialState.status
			state.errors = initialState.errors
			state.msg = initialState.msg
		},
		INIT_INFO: (state) => {
			state.info = initialState.info
			state.status = initialState.status
			state.errors = initialState.errors
			state.msg = initialState.msg
		},
		INIT_DATA: (state) => {
			state.data = initialState.data
			state.dashboard = initialState.dashboard
			state.status = initialState.status
			state.errors = initialState.errors
			state.msg = initialState.msg
		},
		INIT_STATUS: (state) => {
			state.status = initialState.status
			state.errors = initialState.errors
			state.msg = initialState.msg
		},
		REQUEST: (state) => {
			state.status = 'loading'
			state.msg = null
			state.errors = null
		},
		FAILED: (state, action) => {
			state.status = 'error'
			state.msg = action.payload?.msg
			state.errors = action.payload?.errors
		},
	},
})

const actions = slicer.actions
const INIT = () => (dispatch: any) => dispatch(actions.INIT())
const INIT_INFO = () => (dispatch: any) => dispatch(actions.INIT_INFO())
const INIT_DATA = () => (dispatch: any) => dispatch(actions.INIT_DATA())
const INIT_STATUS = () => (dispatch: any) => dispatch(actions.INIT_STATUS())

const Search = (params: { [key: string]: any }) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.get(`/@api/topic/search`, { params })
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		dispatch(actions.INIT_DATA())
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.SET_DATA_LIST(data))
}
const GetDashboard = (params: { [key: string]: any }) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.get(`/@api/topic/dashboard`, { params })
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.SET_DASHBOARD(data))
}

export const TopicAction = {
	INIT,
	INIT_INFO,
	INIT_DATA,
	INIT_STATUS,
	//-Actions
	Search,
	GetDashboard,
}
export default slicer.reducer

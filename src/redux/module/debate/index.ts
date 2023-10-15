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
		.get(`/@api/debate/search`, { params })
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
		.get(`/@api/debate/dashboard`, { params })
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.SET_DASHBOARD(data))
}
const GetDetailOne = (id: string) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.get(`/@api/debate/detail/${id}`)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.SET_INFO(data))
}
const CreateDebateOne = (payload: any) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.put(`/@api/debate`, payload)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.ADD_ONE(data))
}
const UpdateDebateOne = (id: string, payload: any) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.post(`/@api/debate/${id}`, payload)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.UPDATE_ONE(data))
}
const DeleteDebateOne = (id: string) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.delete(`/@api/debate/${id}`)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.DELETE_ONE(data))
}

//-join/cancel
const JoinMemberDebateOne = (id: string, payload: any) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.post(`/@api/debate/join/${id}/member`, payload)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.UPDATE_ONE(data))
	dispatch(actions.JOIN())
}
const JoinObserveDebateOne = (id: string, payload?: any) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.post(`/@api/debate/join/${id}/observe`, payload)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.UPDATE_ONE(data))
	dispatch(actions.JOIN())
}
const CancelJoinDebateOne = (id: string) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.post(`/@api/debate/cancel/${id}/member`)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.UPDATE_ONE(data))
}

export const DebateAction = {
	INIT,
	INIT_INFO,
	INIT_DATA,
	INIT_STATUS,
	//-Actions
	Search,
	GetDashboard,
	GetDetailOne,
	CreateDebateOne,
	UpdateDebateOne,
	DeleteDebateOne,
	//-join/cancel
	JoinMemberDebateOne,
	JoinObserveDebateOne,
	CancelJoinDebateOne,
}
export default slicer.reducer

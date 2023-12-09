import axios from 'utils/axiosInstance'
import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './type'
import { ITopicChatToJSON } from 'types/topic/info'

const slicer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		SET_ROOM: (state, action) => {
			state.room = action.payload.data
			state.msg = action.payload.msg
			state.status = 'finish'
		},
		SET_CHAT_LIST: (state, action) => {
			state.chat = action.payload.data
			state.count = action.payload.count
			state.page = action.payload.page
			state.totalPages = action.payload.totalPages
			state.msg = action.payload.msg
			state.status = 'finish'
		},

		ADD_CHAT_ONE: (state, action) => {
			state.chat = (state.chat || []).concat(action.payload)
		},

		// INIT & Status update
		INIT: (state) => {
			state.room = initialState.room
			state.chat = initialState.chat
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
const INIT_STATUS = () => (dispatch: any) => dispatch(actions.INIT_STATUS())

const GetRoomOne = (topicId: string) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.get(`/@api/topic/room/${topicId}`)
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.SET_ROOM(data))
}
const GetChatList = (roomId: string, params?: any) => async (dispatch: any) => {
	dispatch(actions.REQUEST())
	const res = await axios
		.get(`/@api/topic/message/${roomId}`, { params })
		.then((res) => res)
		.catch((err) => err.response)

	const { status, response, data } = res
	if (status !== 200) {
		const payload = data ? data : response?.data
		return dispatch(actions.FAILED(payload))
	}

	dispatch(actions.SET_CHAT_LIST(data))
}

const AddChatOne = (data: ITopicChatToJSON) => async (dispatch: any) => dispatch(actions.ADD_CHAT_ONE(data))
const UpdateRoomInfo = (data: any) => async (dispatch: any) => dispatch(actions.SET_ROOM(data))

export const TopicChatAction = {
	INIT,
	INIT_STATUS,
	//-Actions
	GetRoomOne,
	GetChatList,
	AddChatOne,
	UpdateRoomInfo,
}
export default slicer.reducer

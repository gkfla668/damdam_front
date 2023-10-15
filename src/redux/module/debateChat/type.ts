import { IDebateChatToJSON, IDebateRoomToJSON } from 'types/debate/info'

export const moudle = 'DEBATE_CHAT'

export interface DebateState {
	room?: IDebateRoomToJSON
	chat?: IDebateChatToJSON[]
	// paging
	page: number
	count: number
	totalPages: number
	// Status Data
	status: ModuleStatus | 'send'
	errors: MoudleErrors
	msg: MoudleMessage
}

export const initialState: DebateState = {
	room: {} as any,
	chat: [],
	// paging
	page: 0,
	count: 0,
	totalPages: 0,
	// Status Data
	status: null,
	errors: null,
	msg: null,
}

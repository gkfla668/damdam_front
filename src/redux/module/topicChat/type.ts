import { ITopicChatToJSON, ITopicRoomToJSON } from 'types/topic/info'

export const moudle = 'TOPIC_CHAT'

export interface TopicState {
	room?: ITopicRoomToJSON
	chat?: ITopicChatToJSON[]
	// paging
	page: number
	count: number
	totalPages: number
	// Status Data
	status: ModuleStatus | 'send'
	errors: MoudleErrors
	msg: MoudleMessage
}

export const initialState: TopicState = {
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

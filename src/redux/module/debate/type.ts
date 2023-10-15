import { IDebateToJSON } from 'types/debate/info'

export const moudle = 'DEBATE'

export interface DebateState {
	info?: IDebateToJSON
	data?: IDebateToJSON[]
	dashboard?: {
		[key: string]: IDebateToJSON[]
	}
	// paging
	page: number
	count: number
	totalPages: number
	// Status Data
	status: ModuleStatus | 'join' | 'password'
	errors: MoudleErrors
	msg: MoudleMessage
}

export const initialState: DebateState = {
	info: {} as any,
	data: [],
	dashboard: {},
	// paging
	page: 0,
	count: 0,
	totalPages: 0,
	// Status Data
	status: null,
	errors: null,
	msg: null,
}

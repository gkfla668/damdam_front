export type TDebateStatus = '시작 전' | '진행 중' | '종료' | '취소'
export const DebateStatus = ['시작 전', '진행 중', '종료', '취소']
export type TDebateCategory = '정치' | '경제' | '생활/문화' | 'IT/과학' | '세계' | '인권' | '환경' | '기타'
export const DebateCategory = ['정치', '경제', '생활/문화', 'IT/과학', '세계', '인권', '환경', '기타']
export const DebatePlayStatus: string[] = ['시작 전', '사회자 진행', '시작', '입론', '교차조사', '반박', '작전회의', '최종결론']
export type TDebatePlayStatus = '시작 전' | '사회자 진행' | '시작' | '입론' | '교차조사' | '반박' | '작전회의' | '최종결론'
export const DebateChatGroup = ['all', 'teamA', 'teamB']
export type TDebateChatType = 'all' | 'teamA' | 'teamB'

export interface IDebateToJSON {
	id: string
	authorId: string
	categorys: TDebateCategory[]
	status: TDebateStatus
	startAt: Date
	title: string
	maxUsers: number
	agreeUsers: IUserToPublic[]
	agreeUserIds: string[]
	disagreeUsers: IUserToPublic[]
	disagreeUserIds: string[]
	observeUserIds: string[]
	isAllowIncome: boolean
	isAllowObserve: boolean
	password: string
}

export interface IDebateRoomToJSON {
	id: string
	status: TDebatePlayStatus
	debateId: string
	current?: IDebateProcessToJSON
	processList: string[]

	createdAt: Date
	updatedAt: Date
}

export interface IDebateProcessToJSON {
	id: string
	status: TDebatePlayStatus
	talker: string
	allowTeamChat: boolean
	startAt: Date
	duration: number
}

export interface IDebateChatToJSON {
	id: string
	roomId: string
	debateId: string
	authorId: string
	group: TDebateChatType

	name: string
	message: string

	// 시스템 정보
	createdAt: Date
}

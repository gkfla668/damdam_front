export type TTopicCategory = '정치' | '경제' | '생활/문화' | 'IT/과학' | '세계' | '인권' | '환경' | '기타'
export const TopicCategory = ['정치', '경제', '생활/문화', 'IT/과학', '세계', '인권', '환경', '기타']

export interface ITopicToJSON {
	id: string
	authorId: string
	categorys: TTopicCategory[]
	startAt: Date
	title: string
}

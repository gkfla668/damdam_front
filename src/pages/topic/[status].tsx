//-next
import type { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'

import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { DebateAction } from 'redux/module/debate'
import { useAuth } from 'utils/hooks/useAuth'
//-modules
import { LayoutContext } from 'context/Layout'
//-Components
import Layout from 'layout'
import MenuTab from 'components/Menu/Tab'
import TextInput from 'components/Input/TextInput'
import TopicItemCard from 'components/Topic/Card'
import LoginModal from 'components/common/LoginModal'
//-assets
import SearchSVG from 'public/icons/btn_search.svg'
//-types
import { DebateCategory } from 'types/debate/info'

//-data
import { topicList } from 'data/topicDummyData'

interface Props {
	status: string
}

export const getServerSideProps = async (context: NextPageContext) => {
	const { query } = context
	const { status } = query

	return { props: { status } }
}

const menu_list = [
	{ label: '전체', value: '전체' },
	{ label: '관심 토픽', value: '관심 토픽' },
]

const Topic: NextPage<Props> = ({ status }: Props) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const { device } = useContext(LayoutContext)
	const { user } = useAuth()
	const loggedIn = user?.id

	const { dashboard, page, count, totalPages } = useAppSelector((state) => state.debate)
	//-chk
	const isAll = status === '전체'
	//-search
	const [category, setCategory] = useState<string>('전체')
	const [filter, setFilter] = useState<string>('최신순')
	const [search, setSearch] = useState<string>('')

	const [list, setList] = useState(topicList)

	const [modal, setModal] = useState<boolean>(false)

	/** 최신순/인기순 필터링 */
	useEffect(() => {
		if (filter === '최신순') return setList([...list].sort((a, b) => a.id - b.id)) // 기존 값에 영향이 가지 않도록 spread 연산자 사용
		return setList([...list].sort((a, b) => b.views + b.comments - a.views + a.comments))
	}, [filter])

	/** 검색 필터링 */
	useEffect(() => {
		return setList([...topicList].filter((topic) => topic.title.includes(search)))
	}, [search])

	const goInterestedTopic = (val: string) => {
		if (val === '관심 토픽' && !loggedIn) return setModal(true)

		router.push(`/topic/${val}`)
	}

	const goTopicFeedPage = (topicId: number) => {
		if (!loggedIn) return setModal(true)
		router.push(`/topic/room/${topicId}`)
	}

	const body = { status, category, search, filter }

	const loadMore = () => dispatch(DebateAction.Search({ ...body, page: page + 1, perPage: 12 }))

	const explore = ({ reset, more }: { reset?: boolean; more?: boolean }) => {
		if (isAll) return dispatch(DebateAction.GetDashboard(body))
		else if (reset) dispatch(DebateAction.Search({ ...body, page: 0, perPage: 12 }))
		else if (more && page + 1 < totalPages) loadMore()
		dispatch(DebateAction.Search({ ...body, page: 0, perPage: 12 }))
	}

	const Dashboard = () => {
		return (
			<div className='flex flex-col '>
				<div className='flex flex-wrap gap-[4rem] mt-12 mb-16'>
					{list?.map(
						(obj) =>
							(category === obj.category || category === '전체') && (
								<TopicItemCard key={obj.id} column={device !== 'desktop' ? 1 : 3} data={obj} onClick={() => goTopicFeedPage(obj.id)} />
							),
					)}
				</div>
			</div>
		)
	}

	return (
		<Layout>
			<div className='container mx-auto mt-12 md:mt-13 md:mb-13 pb:12'>
				<div className='flex flex-col items-center mb-16'>
					<span className='mb-2 text-[2rem] font-extrabold md:text-[3.2rem] text-main-900'>토픽</span>
					<span className='text-sm md:text-lg text-main-900'>토픽에 관한 다양한 의견을 확인해보세요.</span>
				</div>

				<div className='flex flex-col'>
					<MenuTab active={status} list={menu_list} onClick={(val) => goInterestedTopic(val)} className='pb-4 mb-8' />

					<div className='flex flex-col flex-wrap justify-between w-full gap-3 md:flex-row'>
						<div className='flex flex-row items-center gap-3 grow'>
							<TextInput
								type='select'
								placeholder='전체'
								value={category}
								onChange={(val: string) => setCategory(val)}
								options={[{ label: '전체', value: '전체' }, ...DebateCategory.map((str) => ({ label: str, value: str }))]}
								boxClass=' w-full md:min-w-[160px] md:max-w-[160px] '
							/>
							<TextInput
								type='select'
								placeholder='최신순'
								value={filter}
								onChange={(val: string) => setFilter(val)}
								options={[
									{ label: '최신순', value: '최신순' },
									{ label: '인기순', value: '인기순' },
								]}
								boxClass='w-full md:min-w-[160px] md:max-w-[160px]'
							/>
						</div>
						<div className='flex flex-col items-center justify-end gap-3 grow md:flex-row'>
							<TextInput
								type='text'
								placeholder='토픽 주제를 검색하세요.'
								value={search}
								onChange={(val: string) => setSearch(val)}
								onSubmit={() => explore({})}
								rightIcon={<SearchSVG width={24} height={24} onClick={() => explore({})} className='cursor-pointer' />}
								boxClass='w-full md:w-[320px]'
							/>
						</div>
					</div>

					<Dashboard />
				</div>
			</div>
			<LoginModal open={modal} onClose={() => setModal(false)} />
		</Layout>
	)
}

export default Topic

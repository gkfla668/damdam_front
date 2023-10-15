import type { NextPage, NextPageContext } from 'next'
//-next
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { DebateAction } from 'redux/module/debate'
import { useAuth } from 'utils/hooks/useAuth'
//-modules
import { toast } from 'react-toastify'
//-Components
import Link from 'next/link'
import Layout from 'layout'
import MenuTab from 'components/Menu/Tab'
import TextInput from 'components/Input/TextInput'
import CheckBox from 'components/Input/CheckBox'
import DebateItemCard from 'components/Debate/Card'
//-assets
import ArrowSVG from 'public/icons/btn_arrow_bottom2.svg'
import SearchSVG from 'public/icons/btn_search.svg'
import NoResultSVG from 'public/illust/char_gray.svg'
//-types
import { DebateCategory } from 'types/debate/info'
import { LayoutContext } from 'context/Layout'

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
	{ label: '시작 전', value: '시작 전' },
	{ label: '진행 중', value: '진행 중' },
	{ label: '종료', value: '종료' },
]

const DebateSearchPage: NextPage<Props> = ({ status }: Props) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const { device } = useContext(LayoutContext)
	const { user } = useAuth()
	const { dashboard, data, page, count, totalPages } = useAppSelector((state) => state.debate)
	//-chk
	const isAll = status === '전체'
	const loggedIn = user?.id
	//-search
	const [category, setCategory] = useState<string>('')
	const [maxUsers, setMaxUsers] = useState<string>('')
	const [search, setSearch] = useState<string>('')
	const [my, setMy] = useState<boolean>(false)

	const goAddPage = () => {
		if (!loggedIn) return toast.error('로그인이 필요합니다')
		router.push('/debate/form/new')
	}
	const goDebateDetailPage = (id: string) => {
		if (!loggedIn) return toast.error('로그인이 필요합니다')
		router.push(`/debate/detail/${id}`)
	}

	const body = { status, category, search, my, maxUsers }
	const loadMore = () => dispatch(DebateAction.Search({ ...body, page: page + 1, perPage: 12 }))
	const explore = ({ reset, more }: { reset?: boolean; more?: boolean }) => {
		if (isAll) return dispatch(DebateAction.GetDashboard(body))
		else if (reset) dispatch(DebateAction.Search({ ...body, page: 0, perPage: 12 }))
		else if (more && page + 1 < totalPages) loadMore()
		dispatch(DebateAction.Search({ ...body, page: 0, perPage: 12 }))
	}

	//-useEffect
	useEffect(() => {
		explore({ reset: true })
	}, [status])
	useEffect(() => {
		explore({})
	}, [category, my, maxUsers])

	//-Components
	const NoResult = () => (
		<div className='w-full my-4 flex flex-col items-center gap-6'>
			<NoResultSVG width={100} height={100} />
			<span className='text-base text-main-900 font-normal text-center'>
				토론이 없습니다.
				<br />
				지금 바로 토론을 개설해보세요.
			</span>
		</div>
	)

	const Dasbharod = () => {
		const isEmpty =
			Object.values(dashboard || {})
				.map((obj) => obj.length)
				.reduce((a, b) => a + b, 0) === 0

		const wait = (dashboard || {})['시작 전']
		const ing = (dashboard || {})['진행 중']
		const end = (dashboard || {})['종료']

		return (
			<div className='flex flex-col'>
				{isEmpty && <NoResult />}

				{wait?.length ? (
					<>
						<div className='flex flex-row items-center justify-between mb-5'>
							<span className='text-xl text-main-900 font-extrabold'>토론자 모집 중</span>
							<Link href={`/debate/${menu_list[1].value}`}>
								<div className='flex flex-row items-center gap-[2px]'>
									<span className='text-[13px] leading-4 text-main-900 font-normal'>더보기</span>
									<ArrowSVG width={16} height={16} />
								</div>
							</Link>
						</div>

						<div className='flex flex-row flex-wrap mb-10 gap-10'>
							{wait?.map((obj) => (
								<DebateItemCard key={obj.id} column={device !== 'desktop' ? 1 : 3} data={obj} onClick={() => goDebateDetailPage(obj.id)} />
							))}
						</div>
					</>
				) : undefined}

				{ing?.length ? (
					<>
						<div className='flex flex-row items-center justify-between mb-5'>
							<span className='text-xl text-main-900 font-extrabold'>실시간 토론 중</span>
							<Link href={`/debate/${menu_list[2].value}`}>
								<div className='flex flex-row items-center gap-[2px]'>
									<span className='text-[13px] leading-4 text-main-900 font-normal'>더보기</span>
									<ArrowSVG width={16} height={16} />
								</div>
							</Link>
						</div>

						<div className='flex flex-row flex-wrap mb-10 gap-10'>
							{ing?.map((obj) => (
								<DebateItemCard key={obj.id} column={device !== 'desktop' ? 1 : 3} data={obj} onClick={() => goDebateDetailPage(obj.id)} />
							))}
						</div>
					</>
				) : undefined}

				{end?.length ? (
					<>
						<div className='flex flex-row items-center justify-between mb-5'>
							<span className='text-xl text-main-900 font-extrabold'>토론자 모집 완료</span>
							<Link href={`/debate/${menu_list[3].value}`}>
								<div className='flex flex-row items-center gap-[2px]'>
									<span className='text-[13px] leading-4 text-main-900 font-normal'>더보기</span>
									<ArrowSVG width={16} height={16} />
								</div>
							</Link>
						</div>

						<div className='flex flex-row flex-wrap mb-10 gap-10'>
							{end?.map((obj) => (
								<DebateItemCard key={obj.id} column={device !== 'desktop' ? 1 : 3} data={obj} onClick={() => goDebateDetailPage(obj.id)} />
							))}
						</div>
					</>
				) : undefined}
			</div>
		)
	}

	const Search = () => (
		<div className='flex flex-col'>
			<div className='flex flex-row flex-wrap gap-10'>
				{!data?.length && <NoResult />}
				{data?.map((obj) => (
					<DebateItemCard key={obj.id} column={device !== 'desktop' ? 1 : 3} data={obj} onClick={() => goDebateDetailPage(obj.id)} />
				))}
			</div>
		</div>
	)

	return (
		<Layout>
			<div className='container mx-auto mt-12 md:mt-24 pb:12'>
				<div className='flex flex-col items-center mb-20'>
					<span className='text-3xl md:text-5xl text-main-900 font-extrabold mb-2'>토론</span>
					<span className='text-sm md:text-base text-main-900 font-normal'>사람들과 다양한 주제로 토론해보세요.</span>
				</div>

				<div className='flex flex-col'>
					<MenuTab active={status} onClick={(val) => router.push(`/debate/${val}`)} list={menu_list} className='mb-12' />

					<div className='flex flex-col md:flex-row gap-3 justify-between flex-wrap mb-12'>
						<div className='grow flex flex-row items-center'>
							<TextInput
								type='select'
								placeholder='전체'
								value={category}
								onChange={(val: string) => setCategory(val)}
								options={[{ label: '전체', value: undefined }, ...DebateCategory.map((str) => ({ label: str, value: str }))]}
								boxClass='min-w-[130px] max-w-[130px] md:min-w-[160px] md:max-w-[160px] mr-3'
							/>
							<TextInput
								type='select'
								placeholder='전체'
								value={maxUsers}
								onChange={(val: string) => setMaxUsers(val)}
								options={[
									{ label: '전체', value: '' },
									{ label: '1:1', value: '1:1' },
									{ label: '2:2', value: '2:2' },
									{ label: '3:3', value: '3:3' },
									{ label: '4:4', value: '4:4' },
								]}
								boxClass='min-w-[130px] max-w-[130px] md:min-w-[160px] md:max-w-[160px] mr-6'
							/>

							{loggedIn && <CheckBox text='내 토론만 보기' check={my} setCheck={(val) => setMy(val)} />}
						</div>
						<div className='grow flex flex-col md:flex-row justify-end items-center gap-3'>
							<TextInput
								type='text'
								placeholder='검색어를 검색하세요.'
								value={search}
								onChange={(val: string) => setSearch(val)}
								onSubmit={() => explore({})}
								rightIcon={<SearchSVG width={24} height={24} onClick={() => explore({})} className='cursor-pointer' />}
								boxClass='w-full md:w-[320px]'
							/>

							<button className='btn w-full md:w-fit' onClick={goAddPage}>
								토론 개설하기
							</button>
						</div>
					</div>

					{isAll ? <Dasbharod /> : <Search />}
				</div>
			</div>
		</Layout>
	)
}

export default DebateSearchPage

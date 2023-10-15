import type { NextPage, NextPageContext } from 'next'
//-next
import { use, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { DebateAction } from 'redux/module/debate'
import { DebateChatAction } from 'redux/module/debateChat'
import { useAuth } from 'utils/hooks/useAuth'
//-modules
import moment from 'moment'
import { toast } from 'react-toastify'
import { LayoutContext } from 'context/Layout'
//-Components
import Layout from 'layout'
import DebateMemberJoinModal from 'components/Debate/modal/MemberJoin'
import DebateMemberCancelModal from 'components/Debate/modal/MemberCancel'
import DebateObserveJoinModal from 'components/Debate/modal/ObserveJoin'
//-assets
import ArrowSVG from 'public/icons/btn_left_arrow_pc.svg'
import ArrowMSVG from 'public/icons/btn_left_arrow_m.svg'
import CharSVG from 'public/illust/char_color.svg'

interface Props {
	id: string
}

export const getServerSideProps = async (context: NextPageContext) => {
	const { query } = context
	const { id } = query

	return { props: { id } }
}

const colors = {
	'시작 전': {
		text: '#ED7743',
		border: '#4DCB96',
	},
	'진행 중': {
		text: '#ED7743',
		border: '#ED7743',
	},
	종료: {
		text: '#ACB1BA',
		border: '#FFFFFF',
	},
	취소: {
		text: '#ACB1BA',
		border: '#FFFFFF',
	},
}

const DebateDetailViewPage: NextPage<Props> = ({ id }: Props) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const { device } = useContext(LayoutContext)
	const { user } = useAuth()
	const { info, status, errors, msg } = useAppSelector((state) => state.debate)

	const isAuthor = info?.authorId === user?.id
	const isMember = info?.agreeUserIds?.includes(user?.id || '') || info?.disagreeUserIds?.includes(user?.id || '')
	const isObserve = info?.observeUserIds?.includes(user?.id || '')
	const isWait = info?.status === '시작 전'
	const isEnd = info?.status === '종료'
	//-State
	const [modalJoin, setModalJoin] = useState<boolean>(false)
	const [modalCancel, setModalCancel] = useState<boolean>(false)
	const [modalObserve, setModalObserve] = useState<boolean>(false)

	useEffect(() => {
		dispatch(DebateAction.GetDetailOne(id))
		dispatch(DebateChatAction.INIT())

		return () => {
			dispatch(DebateAction.INIT_STATUS())
		}
	}, [])

	useEffect(() => {
		if (status === 'error') {
			toast.error(msg)
			dispatch(DebateAction.INIT_STATUS())
		} else if (status === 'join') {
			setModalJoin(false)
			setModalObserve(false)
			if (info?.observeUserIds.includes(user?.id || '')) router.push(`/debate/room/${info.id}`)
		}
	}, [status])

	return (
		<Layout>
			<div className='container mx-auto mt-12 md:mt-24 pb-5 scroll-hidden'>
				<div className='relative flex flex-col items-center mb-12 pb-12 border-b border-[#E5E8EC]'>
					<div className='absolute left-0 cursor-pointer' onClick={() => router.back()}>
						{device === 'mobile' ? <ArrowMSVG width={24} height={24} /> : <ArrowSVG width={48} height={48} />}
					</div>

					<span className='text-base text-point-900 font-extrabold mb-2'>토론 상세</span>
					<span className='max-w-[70%] md:max-w-[80%] text-xl md:text-3xl leading-[30px] md:leading-[44px] text-center text-main-900 font-extrabold mb-3'>
						{info?.title}
					</span>

					<div className='flex flex-row items-center flex-wrap gap-2'>
						{info?.categorys?.map((str) => (
							<span key={str} className='text-sm text-point-900 font-normal'>
								#{str}
							</span>
						))}
					</div>
				</div>

				<div className='relative flex flex-col mb-12 pb-10 border-b border-[#E5E8EC]'>
					<div className='relative flex flex-col gap-4'>
						<div className='flex flex-row gap-6 items-center'>
							<span className='text-base text-main-900 font-normal'>진행 상태</span>
							<span className={`text-base ${info?.status ? `text-[${colors[info.status].text}]` : 'text-main-900'} font-extrabold`}>
								{info?.status}
							</span>
						</div>

						<div className='flex flex-row gap-6 items-center'>
							<span className='text-base text-main-900 font-normal'>토론 일자</span>
							<span className='text-base text-main-900 font-extrabold'>{moment(info?.startAt).format('YYYY-MM-DD')}</span>
						</div>

						<div className='flex flex-row gap-6 items-center'>
							<span className='text-base text-main-900 font-normal'>토론 시간</span>
							<span className='text-base text-main-900 font-extrabold'>{moment(info?.startAt).format('a hh:mm')}</span>
						</div>

						<div className='flex flex-row gap-6 items-center'>
							<span className='text-base text-main-900 font-normal'>토론 인원</span>
							<span className='text-base text-main-900 font-extrabold'>
								{info?.maxUsers}:{info?.maxUsers}
							</span>
						</div>
					</div>

					<CharSVG
						width={56}
						height={56}
						className={`absolute top-0 right-0 cursor-pointer`}
						style={{
							filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08))',
						}}
					/>
				</div>

				<div className='flex flex-col items-center mb-12'>
					<span className='text-base text-main-900 font-extrabold mb-7'>현재 팀원</span>
					<table className='debate-people'>
						<tr>
							<th>구분</th>
							<th>찬성팀</th>
							<th>반대팀</th>
						</tr>
						{[...Array(info?.maxUsers || 0).keys()].map((val) => (
							<tr>
								<th>{val + 1}번 토론자</th>
								<td>{info?.agreeUsers[val]?.name || '-'}</td>
								<td>{info?.disagreeUsers[val]?.name || '-'}</td>
							</tr>
						))}
					</table>
				</div>

				<div className='flex flex-row justify-between gap-2 md:gap-4'>
					{isAuthor ? (
						<>
							<button className='btn btn-block' onClick={() => router.push(`/debate/form/${info?.id}`)}>
								수정하기
							</button>
							<button
								className='btn btn-block btn-point'
								onClick={() => (isMember ? router.push(`/debate/room/${info?.id}`) : setModalJoin(true))}
							>
								입장하기
							</button>
						</>
					) : isMember ? (
						<>
							{isWait && (
								<button className='btn btn-block' onClick={() => setModalCancel(true)}>
									참가 취소하기
								</button>
							)}
							<button className='btn btn-block btn-point' onClick={() => router.push(`/debate/room/${info?.id}`)}>
								입장하기
							</button>
						</>
					) : isObserve ? (
						<>
							<button className='btn btn-block btn-point' onClick={() => router.push(`/debate/room/${info?.id}`)}>
								참관하기
							</button>
						</>
					) : (
						<>
							{!isWait && (
								<button className='btn btn-block' onClick={() => setModalObserve(true)}>
									참관하기
								</button>
							)}
							{isWait && (
								<button className='btn btn-block btn-point' onClick={() => setModalJoin(true)}>
									참가하기
								</button>
							)}
						</>
					)}
				</div>
			</div>

			<DebateMemberJoinModal
				open={modalJoin}
				password={!info?.isAllowIncome || false}
				maxUsers={info?.maxUsers || 1}
				agreeUserIds={info?.agreeUserIds || []}
				disagreeUserIds={info?.disagreeUserIds || []}
				onClose={() => setModalJoin(false)}
				onSubmit={(team, password) => dispatch(DebateAction.JoinMemberDebateOne(id, { team, password }))}
			/>

			<DebateMemberCancelModal
				open={modalCancel}
				onClose={() => setModalCancel(false)}
				onSubmit={() => dispatch(DebateAction.CancelJoinDebateOne(id))}
			/>

			<DebateObserveJoinModal
				open={modalObserve}
				password={!info?.isAllowObserve || false}
				onClose={() => setModalObserve(false)}
				onSubmit={(password) => dispatch(DebateAction.JoinObserveDebateOne(id, { password }))}
			/>
		</Layout>
	)
}

export default DebateDetailViewPage

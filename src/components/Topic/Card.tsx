import { useContext, useState } from 'react'

//-assets
import ViewsSVG from 'public/icons/icon_views.svg'
import CommentsSVG from 'public/icons/icon_chat.svg'
import HotSVG from 'public/icons/icon_hot.svg'
import HeartOffSVG from 'public/icons/btn_heart_off_pc.svg'
import HeartOnSVG from 'public/icons/btn_heart_on_pc.svg'

import { TDebateCategory } from 'types/debate/info'
import CommentItem from './CommentItem'

import LoginModal from 'components/common/LoginModal'
import { useAuth } from 'utils/hooks/useAuth'
import { LayoutContext } from 'context/Layout'

import { ITopicToJSON } from 'types/topic/info'

import { API } from 'pages/api/api'

interface Props {
	data: ITopicToJSON
	column?: number
	gap?: number
	onClick: any
}

const TopicItemCard = ({ data, column = 4, gap = 40, onClick }: Props) => {
	const [isLiked, setIsLiked] = useState(false)
	const [modal, setModal] = useState<boolean>(false)

	const { user } = useAuth()
	const loggedIn = user?.id

	const { device } = useContext(LayoutContext)
	const isMobile = device === 'mobile'

	const handleLikeClick = async () => {
		if (!loggedIn) return setModal(true)

		const topicId = data?.id

		if (!isLiked) {
			API.post(`/topic/${topicId}/likes`, {
				withCredentials: true,
			})
				.then(() => {})
				.catch((error) => {
					console.error('API 요청 중 오류 발생:', error)
					throw error
				})
		} else {
			try {
				const response = await API.delete(`/topic/${topicId}/likes`)
				if (response.status !== 200) {
					alert('좋아요 취소에 실패하였습니다')
					console.error('좋아요 취소 실패')
				}
			} catch (error) {
				console.error('API 요청 중 오류 발생:', error)
			}
		}

		setIsLiked(!isLiked)
	}

	return (
		<div
			className={`relative debate-card flex flex-col border-2 rounded-[16px] cursor-pointer`}
			style={{
				width: `calc(${100 / column}% - ${gap}px + ${gap / column}px)`,
			}}
		>
			{Number(data.id) <= 6 && (
				<div className='absolute left-7 md:left-10 -top-8'>
					<HotSVG />
				</div>
			)}

			<div
				onClick={() => onClick && onClick()}
				className='relative flex flex-col grow pt-[2.8rem] px-[2rem] md:px-[2.8rem] pb-[1.4rem] md:pb-[1.8rem] border-b border-[#E5E8EC] shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
			>
				<div className='flex flex-row flex-wrap items-center gap-2 text-xs md:text-sm text-[#1c57d8] font-extrabold'>{data?.category}</div>
				<span className='mb-2 text-lg md:text-[2rem] font-extrabold text-main-900'>{data.title}</span>
				<div className='flex gap-[1rem] md:gap-[1.4rem]'>
					<div className='flex items-center justify-center gap-1 md:gap-2'>
						<ViewsSVG />
						<p className='text-xs md:text-sm text-main-900'>{Number(data?.views).toLocaleString('ko-KR')}</p>
					</div>
					<div className='flex items-center justify-center gap-1 md:gap-2'>
						<CommentsSVG />
						<p className='text-xs md:text-sm text-main-900'>{Number(data?.comments).toLocaleString('ko-KR')}</p>
					</div>
				</div>
			</div>
			<button onClick={handleLikeClick} className='absolute top-10 right-10'>
				{isLiked ? (
					!isMobile ? (
						<HeartOnSVG width={32} />
					) : (
						<HeartOnSVG width={24} />
					)
				) : !isMobile ? (
					<HeartOffSVG width={32} />
				) : (
					<HeartOffSVG width={24} />
				)}
			</button>
			<div className='px-[2rem] md:px-[2.8rem] pb-[2.4rem] md:pb-[2.8rem] overflow-hidden'>
				<div className='flex flex-col gap-3'>
					<CommentItem
						userId={'gk'}
						comment={'안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요'}
						time={'3분전'}
					/>
					<CommentItem userId={'eu'} comment={'ㅋㅋㅋ그럴수도 있죠그럴수도 있죠그럴수도 있죠'} time={'3분전'} />
					<CommentItem userId={'kk'} comment={'재밌네요'} time={'3분전'} />
				</div>
			</div>
			<LoginModal open={modal} onClose={() => setModal(false)} />
		</div>
	)
}

export default TopicItemCard

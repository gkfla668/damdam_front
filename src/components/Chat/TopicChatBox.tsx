import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from 'utils/hooks/useAuth'
import { makeUUID } from 'utils/helpers/generator'
import moment from 'moment'
import parse from 'html-react-parser'

import FloatingDambiSVG from 'public/icons/dambi/round_color_dambi.svg'

import { ITopicChatToJSON, ITopicRoomToJSON } from 'types/topic/info'
import TopicItem from 'components/Topic/Item'

interface Props {
	room?: ITopicRoomToJSON
	chat: ITopicChatToJSON[]
	input?: boolean
	children?: JSX.Element
	type?: string
	className?: string
}

const TopicChatBox = ({ room, chat, input, children, type, className }: Props) => {
	const chatRef = useRef<HTMLDivElement>(null)
	const { user } = useAuth()
	const [data, setData] = useState<any>([])

	const Message = ({ type, time, name, message }: { type: 'my' | 'other'; time: any; name: string; message: any }) => {
		if (type === 'my')
			return (
				<div className='flex flex-col items-end w-full mt-5' key={makeUUID()}>
					<span className='mb-2 text-sm font-extrabold w-fit text-main-900'>{name}</span>

					<div className='flex flex-row-reverse items-start justify-start w-full gap-3'>
						<div className={`message-box message-point rounded-tr-none flex flex-col max-w-[70%]`}>
							<span className='text-sm whitespace-pre-line font-[700] text-main-900 tracking-wide'>{message}</span>
						</div>

						<span className='text-xs w-fit font-normal text-[#747983] self-end mb-1 mx-1'>{time}</span>
					</div>
				</div>
			)

		return (
			<div className='flex flex-col w-full mt-5' key={makeUUID()}>
				<span className='mb-1 text-sm font-extrabold w-fit text-main-900'>{name}</span>

				<div className='flex flex-row items-start justify-start w-full gap-3'>
					<div className={`message-box rounded-tl-none flex flex-col max-w-[70%]`}>
						<span className='text-sm font-normal whitespace-pre-line text-main-900'>{message}</span>
					</div>

					<span className='text-xs w-fit font-normal text-[#747983] self-end mb-1 mx-1'>{time}</span>
				</div>
			</div>
		)
	}

	// [#] chatting List
	useEffect(() => {
		const result: any[] = []
		for (let i = 0; i < chat.length; i++) {
			const prev: any = i > 0 ? chat[i - 1] : {}
			const next: any = i + 1 < chat.length ? chat[i + 1] : {}
			const cur = chat[i]

			//- check types
			const type = user?.id === cur.authorId ? 'my' : 'other'
			const date = moment(cur.createdAt).format('YYYY년 MM월 DD일')
			const time = moment(cur.createdAt).format('a hh:mm')

			const day_diff = prev && moment(prev.createdAt).format('MM.DD') != moment(cur.createdAt).format('MM.DD')

			result.push({ name: cur.name, message: cur.message, type, date, time, day_diff })
		}

		setData(result)

		setTimeout(() => {
			if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
		}, 50)
		setTimeout(() => {
			if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
		}, 250)
	}, [chat])

	useEffect(() => {
		setTimeout(() => {
			if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
		}, 50)
		setTimeout(() => {
			if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
		}, 250)
	}, [input, user])

	const chatJSX = useMemo(() => {
		return data.map((cur: any) => <Message type={cur?.type} name={cur?.name} message={cur?.message} time={cur?.time} key={makeUUID()} />)
	}, [data, room])

	return (
		<div
			ref={chatRef}
			className={`relative flex flex-col justify-start items-center max-h-screen overflow-y-scroll scroll-hidden bg-[#F4F6F8] ${className} `}
		>
			{type === 'ai' && (
				<div className='flex flex-col items-center justify-center'>
					<FloatingDambiSVG width={120} height={120} />
					<p className='mt-2 mb-6 font-extrabold text-[14px]'>오늘의 HOT 토픽을 학습해보세요!</p>
					<ul className='flex flex-col items-center justify-center w-full gap-2'>
						<TopicItem isHome={false} title={"'의대 정원 확대', 의료 공백 문제 해결 가능한가? 💉"} />
						<TopicItem isHome={false} title={"'한국형 제시카법', 대책 마련 절실 vs 위헌 소지 ⚠️"} />
						<TopicItem isHome={false} title={"'망분리 규제', 완화해야 하는가? 🔐"} />
						<TopicItem isHome={false} title={"'현금 없는 버스', 편리한 사회 vs 현금 사용 선택권 침해 🚌"} />
						<TopicItem isHome={false} title={"'중대재해법' 근로자 사고 줄일 수 있는가? 🚧"} />
					</ul>
				</div>
			)}
			{chatJSX}
			{children}
		</div>
	)
}

export default TopicChatBox

import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from 'utils/hooks/useAuth'
import { makeUUID } from 'utils/helpers/generator'
import moment from 'moment'
import parse from 'html-react-parser'

import CharSVG from 'public/illust/char_color.svg'
import { IDebateChatToJSON, IDebateRoomToJSON } from 'types/debate/info'

interface Props {
	room?: IDebateRoomToJSON
	chat: IDebateChatToJSON[]
	input?: boolean
	children?: JSX.Element
	className?: string
}

const DebateChatBox = ({ room, chat, input, children, className }: Props) => {
	const chatRef = useRef<HTMLDivElement>(null)
	const { user } = useAuth()
	const [data, setData] = useState<any>([])

	const Message = ({
		type,
		time,
		name,
		message,
		prevSystem,
	}: {
		type: 'my' | 'other' | 'system'
		time: any
		name: string
		message: any
		prevSystem: boolean
	}) => {
		if (type === 'system')
			return (
				<div className={`w-full flex flex-col justify-center items-center text-center ${prevSystem ? 'mt-0' : 'mt-10'}`}>
					{!prevSystem && <CharSVG width={100} height={100} className='mb-6' />}
					<div>{parse(message)}</div>
				</div>
			)

		if (type === 'my')
			return (
				<div className='w-full flex flex-col items-end mt-5' key={makeUUID()}>
					<span className='w-fit text-sm text-main-900 font-extrabold mb-3'>{name}</span>

					<div className='w-full flex flex-row-reverse justify-start items-start gap-3'>
						<div className={`message-box message-point rounded-tr-none flex flex-col max-w-[70%]`}>
							<span className='text-base text-main-900 font-extrabold whitespace-pre-line'>{message}</span>
						</div>

						<span className='text-xs w-fit font-normal text-[#747983] self-end mb-1 mx-1'>{time}</span>
					</div>
				</div>
			)

		return (
			<div className='w-full flex flex-col mt-5' key={makeUUID()}>
				<span className='w-fit text-sm text-main-900 font-extrabold mb-3'>{name}</span>

				<div className='w-full flex flex-row justify-start items-start gap-3'>
					<div className={`message-box rounded-tl-none flex flex-col max-w-[70%]`}>
						<span className='text-base text-main-900 font-normal whitespace-pre-line'>{message}</span>
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
			const type = user?.id === cur.authorId ? 'my' : cur.authorId === undefined ? 'system' : 'other'
			const date = moment(cur.createdAt).format('YYYY년 MM월 DD일')
			const time = moment(cur.createdAt).format('a hh:mm')

			const user_group = prev?.authorId === cur.authorId
			const prev_system = prev?.authorId === cur.authorId && cur?.authorId === undefined
			const user_time_group = user_group && moment(prev.createdAt).format('YYYY.MM.DD') === moment(cur.createdAt).format('YYYY.MM.DD')
			const next_time_group = next?.authorId === cur.authorId && time === moment(next.createdAt).format('a hh:mm')
			const day_diff = prev && moment(prev.createdAt).format('MM.DD') != moment(cur.createdAt).format('MM.DD')

			result.push({ name: cur.name, message: cur.message, type, date, time, prev_system, user_time_group, next_time_group, day_diff })
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
		return data.map((cur: any) => (
			<Message type={cur?.type} name={cur?.name} message={cur?.message} time={cur?.time} prevSystem={cur?.prev_system} key={makeUUID()} />
		))
	}, [data, room])

	return (
		<div ref={chatRef} className={`flex flex-col max-h-screen overflow-y-scroll scroll-hidden bg-[#F4F6F8] ${className}`}>
			{chatJSX}
			{children}
		</div>
	)
}

export default DebateChatBox

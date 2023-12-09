import type { NextPage, NextPageContext } from 'next'
//-next
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from 'redux/hook'
import { TopicChatAction } from 'redux/module/topicChat'

import { useAuth } from 'utils/hooks/useAuth'
import { getToken } from 'utils/axiosInstance'
//-modules
import moment from 'moment'
import { LayoutContext } from 'context/Layout'
import { SocketContext } from 'context/Socket'
//-Components
import Layout from 'layout'
import TopicChatBox from 'components/Chat/TopicChatBox'
import ChatInput from 'components/Chat/Input'
//-assets
import ArrowSVG from 'public/icons/btn_arrow_color_left.svg'
import ArrowMSVG from 'public/icons/btn_arrow_color_left_m.svg'
import FloatingDambiSVG from 'public/icons/dambi/round_color_dambi.svg'
import DelSVG from 'public/icons/icon_delimiter.svg'
import ArrowBMSVG from 'public/icons/btn_arrow_bottom_m.svg'
import { API } from 'pages/api/api'
import { ITopicToJSON } from 'types/topic/info'

interface Props {
	topicId: string
}

export const getServerSideProps = async (context: NextPageContext) => {
	const { query } = context
	const { topicId } = query

	return { props: { topicId } }
}

const TopicFeedRoomPage: NextPage<Props> = ({ topicId }: Props) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const { device } = useContext(LayoutContext)
	const { user } = useAuth()
	const { socket, connected, reconnect } = useContext(SocketContext)
	const { room, chat, status, errors, msg } = useAppSelector((state) => state.topicChat)

	const [count, setCount] = useState<number>(0)
	const [message, setMessage] = useState<string>('')

	const [modal, setModal] = useState<boolean>(false)

	const [info, setInfo] = useState<ITopicToJSON>()

	useEffect(() => {
		dispatch(TopicChatAction.GetRoomOne(topicId))

		return () => {
			dispatch(TopicChatAction.INIT())
		}
	}, [])

	useEffect(() => {
		console.log(topicId)
		API.get(`/topic/dashboard`)
			.then((res) => {
				console.log(res.data.data)
				return setInfo(() => res.data.data.find((topic: { id: string }) => String(topic.id) === topicId))
			})
			.catch((error) => {
				console.error('API 요청 중 오류 발생:', error)
				throw error
			})
	}, [])

	//-socket
	useEffect(() => {
		socket?.on('recv_message', (data: any) => recv(data?.data))

		socket?.on('send_finish', (data: any) => {
			setMessage('')
			recv(data?.data)
		})

		return () => {
			socket?.off('recv_message') - socket?.off('send_finish')
		}
	}, [socket, connected])

	useEffect(() => {
		reconnect({ token: getToken() })
	}, [connected, user])

	//-message
	const send = () => {
		if (!message.length) return
		const body = { topicId, message }
		socket.emit('send_comment', body)
	}

	const recv = (data: any) => {
		if (room?.id === data.roomId || room?.id === data.roomId?.id || topicId === data.topicId) dispatch(TopicChatAction.AddChatOne(data))
	}

	useEffect(() => {
		if (room?.id) dispatch(TopicChatAction.GetChatList(room?.id || ''))
	}, [room?.id])

	useEffect(() => {
		if (room?.current?.duration) {
			const past_seconds = moment.duration(moment(moment()).diff(room.current.startAt)).asSeconds()
			setCount(room.current.duration - Math.ceil(past_seconds))
		}
	}, [room?.current])

	useEffect(() => {
		const interval = setInterval(() => {
			if (count > 0) setCount((prevCount) => prevCount - 1)

			clearInterval(interval)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [count])

	return (
		<Layout
			option={{
				style: {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					overflow: 'hidden',
				},
			}}
		>
			<div className={`${device !== 'mobile' ? 'w-[50vw]' : 'w-[100vw]'} h-[100%] flex flex-col`}>
				<div className='container mx-auto my-[1.4rem] md:my-[2.4rem]'>
					{device === 'mobile' ? (
						<div className='py-[0.4rem] flex justify-center items-center'>
							{!modal ? (
								<div className='relative flex flex-col items-center w-full'>
									<div className='absolute left-0 cursor-pointer top-2' onClick={() => router.back()}>
										{device === 'mobile' ? <ArrowMSVG width={20} height={20} /> : <ArrowSVG width={28} height={28} />}
									</div>

									<div className='flex flex-col items-center justify-center w-full gap-1 md:gap-2'>
										<div className='text-blue text-[10px] md:text-[12px] font-extrabold text-center'>{info?.category}</div>
										<div className='max-w-[80%] md:max-w-[60%] text-lg md:text-[2rem] leading-[2rem] md:leading-[2.4rem] text-center text-main-900 font-extrabold'>
											{info?.title}
										</div>
										<div className='flex items-center justify-center gap-3'>
											<span className='text-xs md:text-sm'>조회수 {info?.views}</span>
											<DelSVG />
											<span className='text-xs md:text-sm'>의견수 {info?.comments}</span>
										</div>
									</div>
									<div
										onClick={() => setModal(true)}
										className='pt-[1.2rem] mt-[1.2rem] border-t-[0.1rem] border-t-gray w-full flex justify-center items-center'
									>
										<ArrowBMSVG />
									</div>
								</div>
							) : (
								<div onClick={() => setModal(false)}>
									<ArrowBMSVG />
								</div>
							)}
						</div>
					) : (
						<div className='relative flex flex-col items-center'>
							<div className='absolute left-0 cursor-pointer top-2' onClick={() => router.back()}>
								{device === 'mobile' ? <ArrowMSVG width={20} height={20} /> : <ArrowSVG width={28} height={28} />}
							</div>

							<div className='flex flex-col items-center justify-center w-full gap-1 md:gap-2'>
								<div className='text-blue text-[10px] md:text-[12px] font-extrabold text-center'>{info?.category}</div>
								<div className='max-w-[80%] md:max-w-[60%] text-lg md:text-[2rem] leading-[2rem] md:leading-[2.4rem] text-center text-main-900 font-extrabold'>
									{info?.title}
								</div>
								<div className='flex items-center justify-center gap-3'>
									<span className='text-xs md:text-sm'>조회수 {info?.views}</span>
									<DelSVG />
									<span className='text-xs md:text-sm'>의견수 {info?.comments}</span>
								</div>
							</div>
						</div>
					)}
				</div>
				<div className='flex flex-col overflow-hidden md:container grow' style={{ maxHeight: '100vh' }}>
					<div className='flex flex-col justify-between mb-0 overflow-auto grow scroll-hidden'>
						<TopicChatBox room={room} chat={chat || []} className={`${device !== 'mobile' && 'rounded-t-[24px]'} grow px-4 py-10`} />

						<div className='relative flex flex-col items-center bg-[#F4F6F8] rounded-b-[24px] px-5 pb-4'>
							<FloatingDambiSVG
								width={56}
								height={56}
								className={`absolute bottom-36 md:bottom-40 right-8 cursor-pointer drop-shadow-md hover:scale-110 hover:transition-transform active:drop-shadow-sm`}
								onClick={() => router.push('/study')}
							/>
							<ChatInput
								value={message}
								onChange={(val) => setMessage(val)}
								onSubmit={() => send()}
								placeholder='토픽에 관한 의견을 작성해보세요.'
								className='w-full'
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default TopicFeedRoomPage

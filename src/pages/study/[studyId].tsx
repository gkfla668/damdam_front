import type { NextPage, NextPageContext } from 'next'
import { useContext, useState } from 'react'
import Modal from 'react-modal'

import { LayoutContext } from 'context/Layout'
import { SocketContext } from 'context/Socket'

import DebateChatBox from 'components/Chat/ListBox'
import ChatInput from 'components/Chat/Input'
import TextInput from 'components/Input/TextInput'
import QuestionItem from 'components/Study/QuestionItem'

import SearchSVG from 'public/icons/btn_search.svg'
import AddSVG from 'public/icons/btn_plus.svg'
import ArrowBM from 'public/icons/btn_arrow_bottom_study_m.svg'
import ArrowTM from 'public/icons/btn_arrow_top_study_m.svg'

import Layout from 'layout'
import styled from 'styled-components'
import TopicChatBox from 'components/Chat/TopicChatBox'
import { useAppSelector } from 'redux/hook'

interface Props {
	studyId: string
}

export const getServerSideProps = async (context: NextPageContext) => {
	const { query } = context
	const { studyId } = query

	return { props: { studyId } }
}

const StudyRoomPage: NextPage<Props> = ({ studyId }: Props) => {
	const [search, setSearch] = useState<string>('')

	const [message, setMessage] = useState<string>('')
	const { device } = useContext(LayoutContext)
	const { socket } = useContext(SocketContext)

	const [open, setOpen] = useState<boolean>(false)
	const { room, chat, status, errors, msg } = useAppSelector((state) => state.topicChat)

	//-message
	const send = () => {
		if (!message.length) return
		const body = { roomId: room?.id, studyId, message }
		socket.emit('send_message', body)
	}

	const body = { studyId, search }

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
			<div className='w-[100vw] h-[100%] flex flex-col'>
				<div className='flex flex-col w-full h-full md:container md:flex-row'>
					{device !== 'mobile' ? (
						<div className='w-[26%] max-h-screen '>
							<div className='py-10 pr-8 '>
								<TextInput
									type='text'
									placeholder='학습 목록을 검색하세요.'
									value={search}
									onChange={(val: string) => setSearch(val)}
									onSubmit={''}
									rightIcon={<SearchSVG width={24} height={24} className='cursor-pointer' />}
									boxClass='w-[288px]'
								/>
							</div>

							<div>
								<div className='flex justify-between pr-8 mb-8'>
									<p className='font-extrabold text-main-900'>학습 목록</p>

									<div className='cursor-pointer'>
										<AddSVG width={16} height={16} />
									</div>
								</div>

								<List className='h-[70vh] overflow-y-scroll pr-4'>
									<QuestionItem title={'새로운 학습'} type={'new'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능한 어쩌고'} />
									<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
									<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
									<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
									<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
									<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
									<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
									<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
									<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
									<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
								</List>
							</div>
						</div>
					) : (
						<div className='flex items-center justify-between w-full px-[2rem] py-[1.6rem]'>
							<p className='whitespace-nowrap'>학습 목록 리스트 </p>
							<>
								{open ? (
									<div onClick={() => setOpen(false)}>
										<ArrowBM />
									</div>
								) : (
									<div onClick={() => setOpen(true)}>
										<ArrowTM />
									</div>
								)}
							</>
						</div>
					)}

					<div className='flex flex-col overflow-hidden md:container grow' style={{ maxHeight: '100vh' }}>
						<div className='bg-[#f4f6f8] flex flex-col justify-between mb-0 overflow-auto grow scroll-hidden'>
							<DebateChatBox
								room={room}
								chat={chat || []}
								type={'ai'}
								className={`${device !== 'mobile' && 'rounded-t-[24px]'} grow px-4 py-10`}
							/>

							<div className='relative flex flex-col items-center bg-[#F4F6F8] rounded-b-[24px] px-5 pb-4'>
								<ChatInput
									value={message}
									onChange={(val) => setMessage(val)}
									onSubmit={() => send()}
									placeholder='학습하고 싶은 내용을 질문해 보세요.'
									className='w-full'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal isOpen={open} onRequestClose={() => setOpen(false)} ariaHideApp={false}>
				<div className='pb-8 '>
					<TextInput
						type='text'
						placeholder='학습 목록을 검색하세요.'
						value={search}
						onChange={(val: string) => setSearch(val)}
						onSubmit={''}
						rightIcon={<SearchSVG width={24} height={24} className='cursor-pointer' />}
					/>
				</div>

				<div>
					<div className='flex justify-between mb-4'>
						<p className='font-extrabold text-main-900'>학습 목록</p>
						<div className='cursor-pointer'>
							<AddSVG width={16} height={16} />
						</div>
					</div>

					<List className='h-[62vh] overflow-y-scroll my-6 pr-4'>
						<QuestionItem title={'새로운 학습'} type={'new'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능한 어쩌고'} />
						<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
						<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
						<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
						<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
						<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
						<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
						<QuestionItem title={'우주 탐사가 인류에게 가져올 잠재적인 위험에 어쩌고'} />
						<QuestionItem title={'산업혁명은 현대 사회와 경제를 어떻게 영향을 어쩌고'} />
						<QuestionItem title={'화석 연료와 재생 가능 에너지원 사용이 가능 어쩌고'} />
					</List>
				</div>
			</Modal>
		</Layout>
	)
}

export default StudyRoomPage

const List = styled.ul`
	overflow-y: auto;
	cursor: pointer;

	&::-webkit-scrollbar {
		width: 12px;
	}

	&::-webkit-scrollbar-thumb {
		height: 80%;
		background-color: #edeff0;
		border-radius: 20px;
	}

	&::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0);
	}

	@media screen and (max-width: 768px) {
		&::-webkit-scrollbar {
			width: 8px;
		}
	}
`

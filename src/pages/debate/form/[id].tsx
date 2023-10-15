import type { NextPage, NextPageContext } from 'next'
//-next
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { DebateAction } from 'redux/module/debate'
//-modules
import moment, { Moment } from 'moment'
import { toast } from 'react-toastify'
import { LayoutContext } from 'context/Layout'
//-Components
import Layout from 'layout'
import TextInput from 'components/Input/TextInput'
import Radio from 'components/Input/Radio'
import SelectBox from 'components/Input/SelectBox'
//-assets
import ArrowSVG from 'public/icons/btn_left_arrow_pc.svg'
import ArrowMSVG from 'public/icons/btn_left_arrow_m.svg'
//-types
import { DebateCategory } from 'types/debate/info'

interface Props {
	id: string
}

export const getServerSideProps = async (context: NextPageContext) => {
	const { query } = context
	const { id } = query

	return { props: { id } }
}

const DebateFormPage: NextPage<Props> = ({ id }: Props) => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const { device } = useContext(LayoutContext)
	const { info, status, errors, msg } = useAppSelector((state) => state.debate)

	const isNew = id === 'new'
	const [categorys, setCategorys] = useState<string[]>([])
	const [title, setTitle] = useState<string>('')
	const [maxUsers, setMaxUsers] = useState<number>(0)
	const [password, setPassword] = useState<string>('')
	const [isAllowIncome, setIsAllowIncome] = useState<boolean>(true)
	const [isAllowObserve, setIsAllowObserve] = useState<boolean>(true)
	const [startAt, setStartAt] = useState<Moment>(moment().add(10, 'minutes'))

	const toggleCategory = (str: string) => {
		const exist = categorys.includes(str)
		if (exist) setCategorys(categorys.filter((v) => v !== str))
		else if (categorys.length < 3) setCategorys([...categorys, str])
	}

	//-form action
	const isActive = categorys.length && maxUsers && title
	const submit = () => {
		if (!isActive) return false
		const body = { categorys, title, maxUsers, password, isAllowIncome, isAllowObserve, startAt: startAt.toISOString() }
		isNew ? dispatch(DebateAction.CreateDebateOne(body)) : dispatch(DebateAction.UpdateDebateOne(id, body))
	}

	const remove = () => {
		dispatch(DebateAction.DeleteDebateOne(id))
	}

	//-useEffect
	useEffect(() => {
		if (isNew) dispatch(DebateAction.INIT_INFO())
		else dispatch(DebateAction.GetDetailOne(id))
	}, [id])

	useEffect(() => {
		if (status === 'add') {
			toast(msg)
			router.replace(`/debate/detail/${info?.id}`)
		} else if (status === 'update') {
			toast(msg)
			router.back()
		} else if (status === 'delete') {
			toast(msg)
			router.replace('/debate')
		} else if (status === 'error') {
			toast.error(msg)
		}
	}, [status])

	useEffect(() => {
		setCategorys(info?.categorys || [])
		setTitle(info?.title || '')
		setMaxUsers(info?.maxUsers || 0)
		setIsAllowIncome(info?.isAllowIncome != undefined ? info.isAllowIncome : true)
		setIsAllowObserve(info?.isAllowObserve != undefined ? info.isAllowObserve : true)
		setPassword(info?.password || '')
		setStartAt(info?.startAt ? moment(info?.startAt) : moment().add(10, 'minutes'))
	}, [info])

	return (
		<Layout>
			<div className='container mx-auto mt-12 md:mt-24 pb-5 scroll-hidden'>
				<div className='relative flex flex-col items-center mb-20'>
					<div className='absolute left-0 cursor-pointer' onClick={() => router.back()}>
						{device === 'mobile' ? <ArrowMSVG width={24} height={24} /> : <ArrowSVG width={48} height={48} />}
					</div>
					<span className='text-3xl md:text-5xl text-main-900 font-extrabold mb-2'>토론 {isNew ? '개설' : '수정'}</span>
					<span className='text-sm md:text-base text-main-900 font-normal'>
						{isNew ? '토론방을 새롭게 개설하세요.' : '토론방의 정보를 수정하세요.'}
					</span>
				</div>

				<div className='flex flex-col gap-12 mb-16'>
					<div className='flex flex-col'>
						<span className='text-base text-main-900 font-extrabold mb-1'>카테고리</span>
						<span className='text-[13px] text-main-900 font-normal mb-6'>토론 논제와 관련된 카테고리를 최대 3개 선택해주세요.</span>

						<div className='flex flex-row items-center flex-wrap gap-3'>
							{DebateCategory.map((str) => (
								<SelectBox text={str} check={categorys.includes(str)} setCheck={() => toggleCategory(str)} />
							))}
						</div>
					</div>

					<div className='flex flex-col'>
						<span className='text-base text-main-900 font-extrabold mb-1'>논제</span>
						<span className='text-[13px] text-main-900 font-normal mb-6'>토론 논제 찬반이 명확하게 나뉘는 주제로 작성해주세요.</span>

						<TextInput value={title} onChange={(val: string) => setTitle(val)} placeholder='논제 입력하기' boxClass='mb-3' />
						<span className='text-[13px] text-[#747983] font-normal'>* 한글 기준 100자 이내</span>
					</div>

					<div className='flex flex-col'>
						<span className='text-base text-main-900 font-extrabold mb-1'>토론 인원</span>
						<span className='text-[13px] text-main-900 font-normal mb-6'>토론에 참가할 인원을 선택해주세요.</span>

						<div className='flex flex-row items-center flex-wrap gap-3'>
							<SelectBox text={'1:1'} check={maxUsers === 1} setCheck={() => setMaxUsers(1)} />
							<SelectBox text={'2:2'} check={maxUsers === 2} setCheck={() => setMaxUsers(2)} />
							<SelectBox text={'3:3'} check={maxUsers === 3} setCheck={() => setMaxUsers(3)} />
							<SelectBox text={'4:4'} check={maxUsers === 4} setCheck={() => setMaxUsers(4)} />
						</div>
					</div>

					<div className='flex flex-col'>
						<span className='text-base text-main-900 font-extrabold mb-4'>잠금 설정</span>
						<div className='flex flex-row items-center gap-6 mb-2'>
							<span className='tex-tsm text-main-900 font-extrabold min-w-[140px]'>누구나 토론자로 참여</span>
							<Radio text='허용' check={isAllowIncome} setCheck={() => setIsAllowIncome(true)} />
							<Radio text='비허용' check={!isAllowIncome} setCheck={() => setIsAllowIncome(false)} />
						</div>

						<div className='flex flex-row items-center gap-6 mb-3'>
							<span className='tex-tsm text-main-900 font-extrabold min-w-[140px]'>누구나 토론 참관</span>
							<Radio text='허용' check={isAllowObserve} setCheck={() => setIsAllowObserve(true)} />
							<Radio text='비허용' check={!isAllowObserve} setCheck={() => setIsAllowObserve(false)} />
						</div>

						{!isAllowIncome || !isAllowObserve ? (
							<div className='flex flex-row items-center gap-6'>
								<span className='tex-tsm text-main-900 font-extrabold min-w-[140px]'>비밀번호</span>
								<TextInput
									type='text'
									value={password}
									onChange={(val: string) => setPassword(val)}
									placeholder='숫자 4자리 입력'
									boxClass='w-fit'
									maxLength={4}
								/>
							</div>
						) : undefined}
					</div>

					<div className='flex flex-col'>
						<span className='text-base text-main-900 font-extrabold mb-1'>토론 예정 일시</span>
						<span className='text-[13px] text-main-900 font-normal mb-6'>토론을 진행할 예정인 날짜와 시간을 선택해주세요.</span>

						<div className='flex flex-row justify-between gap-4'>
							<TextInput
								type='date'
								value={startAt.format('YYYY-MM-DD')}
								onChange={(date: string) => setStartAt(moment(`${date} ${startAt.format('HH:mm')}`))}
								boxClass='grow'
							/>
							<TextInput
								type='time'
								value={startAt.format('HH:mm')}
								onChange={(time: string) => setStartAt(moment(`${startAt.format('YYYY-MM-DD')} ${time}`))}
								boxClass='grow'
							/>
						</div>
					</div>
				</div>

				<div className='flex flex-row justify-between gap-2 md:gap-4'>
					{isNew ? (
						<>
							<button
								className={`btn btn-block ${isActive ? 'btn-point' : 'btn-disabled-gradient cursor-not-allowed'}`}
								onClick={() => submit()}
							>
								완료하기
							</button>
						</>
					) : (
						<>
							<button className='btn btn-block' onClick={() => remove()}>
								토론 삭제하기
							</button>
							<button className='btn btn-block btn-point' onClick={() => submit()}>
								수정 완료하기
							</button>
						</>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default DebateFormPage

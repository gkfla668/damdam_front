import { useContext, useState } from 'react'
import { LayoutContext } from 'context/Layout'

import Modal from 'react-modal'
import CharSVG from 'public/icons/dambi/floating_dambi.svg'
import IconSVG from 'public/icons/orange_my_pc.svg'
import IconMSVG from 'public/icons/orange_my_pc.svg'
import PasswordModal from './Password'

interface Props {
	open: boolean
	password: boolean
	maxUsers: number
	agreeUserIds: string[]
	disagreeUserIds: string[]

	onClose: () => void
	onSubmit: (team: string, password?: string) => void
	className?: string
}

const DebateMemberJoinModal = ({ open, password, maxUsers, agreeUserIds, disagreeUserIds, onClose, onSubmit, className }: Props) => {
	const { device } = useContext(LayoutContext)
	const [team, setTeam] = useState<string>('')
	const [modalPass, setModalPass] = useState<boolean>(false)

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			padding: 0,
			border: 0,
			radius: 12,
			width: '100%',
			minWidth: device === 'desktop' ? 396 : 0,
			maxWidth: 640,
			height: 'auto',
			maxHeight: '100vh',
			overflow: 'auto',
			background: 'none',
		},
		overlay: {
			backgroundColor: 'rgba(0,0,0,0.5)',
		},
	}

	const char_size = device === 'mobile' ? 80 : 100

	const submit = () => {
		onClose()
		if (password) return setModalPass(true)
		onSubmit && onSubmit(team)
	}

	return (
		<>
			<Modal isOpen={open} ariaHideApp={false} style={customStyles} onRequestClose={() => onClose && onClose()} closeTimeoutMS={300}>
				<div className='w-[-webkit-fill-available] p-10 bg-white rounded-t-lg'>
					<div className='flex flex-col items-center'>
						<div className='relative mb-6'>
							<CharSVG width={char_size} height={char_size} />
							{device === 'mobile' ? (
								<IconMSVG width={32} height={32} className='absolute -right-1 -bottom-1' />
							) : (
								<IconSVG width={40} height={40} className='absolute -right-1 -bottom-1' />
							)}
						</div>

						<span className='mb-10 text-xl font-extrabold text-main-900'>토론자로 참가하고 싶은 팀을 선택해주세요.</span>
						<div className='flex flex-row w-full gap-4'>
							<button
								className={`btn btn-block ${team === 'agree' && 'btn-point'} rounded-[20px] flex flex-col h-[86px]`}
								onClick={() => setTeam('agree')}
							>
								<span className='text-xl text-blue'>찬성팀</span>
								<span className='text-sm text-blue'>(남은 인원 {maxUsers - agreeUserIds.length}명)</span>
							</button>

							<button
								className={`btn btn-block ${team === 'disagree' && 'btn-point'} rounded-[20px] flex flex-col h-[86px]`}
								onClick={() => setTeam('disagree')}
							>
								<span className='text-xl text-blue'>반대팀</span>
								<span className='text-sm text-blue'>(남은 인원 {maxUsers - disagreeUserIds.length}명)</span>
							</button>
						</div>
					</div>

					<div className='flex flex-row gap-5 mb-[14px]'></div>
				</div>

				<div className='flex flex-row justify-between overflow-hidden bg-white rounded-b-lg'>
					<button className='rounded-none btn btn-block btn-gray' onClick={() => onClose && onClose()}>
						취소
					</button>
					<button className='rounded-none btn btn-block btn-gray' onClick={() => submit()}>
						확인
					</button>
				</div>
			</Modal>

			<PasswordModal open={modalPass} onClose={() => setModalPass(false)} onSubmit={(val: string) => onSubmit && onSubmit(team, val)} />
		</>
	)
}

export default DebateMemberJoinModal

import { useContext } from 'react'
import { LayoutContext } from 'context/Layout'

import Modal from 'react-modal'
import CharSVG from 'public/illust/char_color.svg'
import IconSVG from 'public/icons/orange_play_pc.svg'
import IconMSVG from 'public/icons/orange_play_m.svg'

interface Props {
	open: boolean
	onClose: () => void
	onSubmit: () => void
	className?: string
}

const DebateStartConfirmModal = ({ open, onClose, onSubmit, className }: Props) => {
	const { device } = useContext(LayoutContext)
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
		onSubmit && onSubmit()
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

						<span className='text-xl text-main-900 font-extrabold text-center'>
							아직 모든 토론자가 참석하지 않았습니다.
							<br />
							정말로 토론을 시작하시나요?
						</span>
					</div>

					<div className='flex flex-row gap-5 mb-[14px]'></div>
				</div>

				<div className='flex flex-row justify-between bg-white rounded-b-lg overflow-hidden'>
					<button className='btn btn-block btn-gray rounded-none' onClick={() => submit()}>
						예
					</button>
					<button className='btn btn-block btn-gray rounded-none' onClick={() => onClose && onClose()}>
						아니오
					</button>
				</div>
			</Modal>
		</>
	)
}

export default DebateStartConfirmModal

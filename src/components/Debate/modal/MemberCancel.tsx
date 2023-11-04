import { useContext } from 'react'
import { LayoutContext } from 'context/Layout'

import Modal from 'react-modal'
import CharSVG from 'public/icons/dambi/floating_dambi.svg'
import IconSVG from 'public/icons/orange_icon_exit_pc.svg'
import IconMSVG from 'public/icons/orange_icon_exit_m.svg'

interface Props {
	open: boolean
	onClose: () => void
	onSubmit: () => void
	className?: string
}

const DebateMemberCancelModal = ({ open, onClose, onSubmit, className }: Props) => {
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

						<span className='mb-10 text-xl font-extrabold text-main-900'>정말로 토론 참가를 취소하시겠습니까?</span>
					</div>
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
		</>
	)
}

export default DebateMemberCancelModal

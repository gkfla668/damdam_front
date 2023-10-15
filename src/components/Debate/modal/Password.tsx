import { useContext, useEffect, useState } from 'react'
import { LayoutContext } from 'context/Layout'

import Modal from 'react-modal'
import CharSVG from 'public/illust/char_color.svg'
import IconSVG from 'public/icons/orange_lock_pc.svg'
import IconMSVG from 'public/icons/orange_lock_m.svg'
import TextInput from 'components/Input/TextInput'

interface Props {
	open: boolean
	onClose: () => void
	onSubmit: (val: string) => void
	className?: string
}

const PasswordModal = ({ open, onClose, onSubmit, className }: Props) => {
	const { device } = useContext(LayoutContext)
	const [password, setPassword] = useState<string>('')

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

	useEffect(() => {
		if (!open) setPassword('')
	}, [open])

	return (
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

					<span className='text-xl text-main-900 text-center font-extrabold mb-10'>
						잠금된 토론입니다.
						<br />
						비밀번호를 입력해주세요.
					</span>

					<TextInput
						type='text'
						value={password}
						onChange={(val: string) => setPassword(val)}
						placeholder='숫자 4자리 입력'
						maxLength={4}
						boxClass='mb-6'
					/>

					<button
						className='btn btn-point btn-block'
						onClick={() => {
							onClose()
							onSubmit && onSubmit(password)
						}}
					>
						확인
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default PasswordModal

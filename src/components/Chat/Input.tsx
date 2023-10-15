import Textarea from 'react-textarea-autosize'
import EnterIcon from 'public/icons/icon_enter_pc.svg'

interface Props {
	value: string
	onChange: (val: string) => void
	onSubmit: () => void
	placeholder: string
	className?: string
}

const ChatInput = ({ value, placeholder, onChange, onSubmit, className }: Props) => {
	return (
		<div className={`relative bg-white border-2 border-point-900 rounded-2xl p-4 ${className}`}>
			<Textarea
				value={value}
				onChange={(e) => onChange && onChange(e.currentTarget.value.slice(0, 1000))}
				placeholder={placeholder}
				minRows={2}
				maxRows={5}
				className='input-textarea w-full'
				// onSubmit={() => onSubmit && onSubmit()}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault()
						onSubmit && onSubmit()
					}
				}}
			/>

			<div className='absolute right-4 bottom-4 flex flex-row justify-end items-center gap-4'>
				<span className='text-sm text-main-900 font-normal'>{value.length}/1000</span>
				<button className='btn btn-point border-none h-10 flex flex-row gap-2 items-center' onClick={() => onSubmit && onSubmit()}>
					<EnterIcon width={20} height={20} />
					등록
				</button>
			</div>
		</div>
	)
}

export default ChatInput

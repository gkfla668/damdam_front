import CheckOn from 'public/icons/btn_checkbox_on.svg'
import CheckOff from 'public/icons/btn_checkbox_off.svg'

interface Props {
	text: string
	check: boolean
	setCheck: (val: boolean) => void
	className?: string
}

const CheckBox = ({ text, check, setCheck, className }: Props) => {
	return (
		<div className={`w-full flex justify-between items-center cursor-pointer whitespace-nowrap ${className}`}>
			<div className='flex flex-row grow items-center gap-[6px]' onClick={() => setCheck(!check)}>
				<div>{check ? <CheckOn width={24} height={24} /> : <CheckOff width={24} height={24} />}</div>
				<label className='text-sm font-normal cursor-pointer text-main-900'>{text}</label>
			</div>
		</div>
	)
}

export default CheckBox

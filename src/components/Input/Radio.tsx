import RadioOn from 'public/icons/btn_radio_on.svg'
import RadioOff from 'public/icons/btn_radio_off.svg'

interface Props {
	text: string
	check: boolean
	setCheck: (val: boolean) => void
	className?: string
}

const Radio = ({ text, check, setCheck, className }: Props) => {
	return (
		<div className={`flex flex-row items-center gap-2 cursor-pointer`} onClick={() => setCheck(!check)}>
			{check ? <RadioOn width={24} height={24} /> : <RadioOff width={24} height={24} />}
			<span className='text-base font-normal text-main-900'>{text}</span>
		</div>
	)
}

export default Radio

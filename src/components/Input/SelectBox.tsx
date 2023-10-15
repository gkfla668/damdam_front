interface Props {
	text: string
	check: boolean
	setCheck: (val: boolean) => void
	className?: string
}

const SelectBox = ({ text, check, setCheck, className }: Props) => {
	return (
		<div
			className={`w-fit px-5 py-3 rounded-full cursor-pointer box-content group hover:border-2 hover:border-[#7F90BF] ${className} ${
				check ? 'border-2 border-point-900' : 'border border-[#D8DADD]'
			}`}
			onClick={() => setCheck(!check)}
		>
			<span className={`text-sm group-hover:text-[#7F90BF] ${check ? 'text-point-900 font-extrabold' : 'text-main-900 font-normal'}`}>
				{text}
			</span>
		</div>
	)
}

export default SelectBox

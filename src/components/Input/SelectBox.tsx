interface Props {
	text: string
	check: boolean
	setCheck: (val: boolean) => void
	className?: string
}

const SelectBox = ({ text, check, setCheck, className }: Props) => {
	return (
		<div
			className={`w-fit px-[1.8rem] md:px-[2rem] py-[0.8rem] md:py-[1rem] rounded-full cursor-pointer box-content group hover:border-2 hover:border-[#7F90BF] ${className} ${
				check ? 'border-2 border-blue' : 'border border-[#D8DADD]'
			}`}
			onClick={() => setCheck(!check)}
		>
			<span className={`text-base group-hover:text-[#7F90BF] ${check ? 'text-blue font-extrabold' : 'text-main-900 font-normal'}`}>
				{text}
			</span>
		</div>
	)
}

export default SelectBox

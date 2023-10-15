import DraggableBox from 'components/Scroll/DraggableBox'
import { motion } from 'framer-motion'

interface MenuItem {
	label: string
	value: string
}

interface Props {
	active: string
	onClick: (value: string) => void
	list: MenuItem[]
	className?: string
}

const MenuTab = ({ list, active, onClick, className }: Props) => {
	return (
		<DraggableBox className={`w-full flex flex-row flex-wrap overflow-x-scroll scrollbar-visible-none ${className}`}>
			{list?.map(({ label, value }) => (
				<div
					key={`menu-${value}`}
					onClick={() => onClick && onClick(value)}
					className='group grow flex-shrink-0 transition-all ease-in-out duration-150'
				>
					<button
						className={`w-full flex flex-col h-10 gap-3 items-center text-base group-hover:text-[#7F90BF] ${
							active === value ? 'text-point-900 font-extrabold' : `text-[#747983] font-normal`
						}`}
					>
						{label}
						{active === value && <motion.div layoutId='menu-underline' className='w-full h-[1px] border-b-4 border-point-900' animate />}
						{active !== value && (
							<div className='w-full h-[1px] border-b group-hover:border-b-4 mt-[3px] group-hover:mt-0 border-[#E5E8EC] group-hover:border-[#7F90BF] transition-all ease-in-out duration-150' />
						)}
					</button>
				</div>
			))}
		</DraggableBox>
	)
}

export default MenuTab

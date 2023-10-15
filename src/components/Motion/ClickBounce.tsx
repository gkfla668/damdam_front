import { motion } from 'framer-motion'

const ClickBounce = ({
	bounce = 0.01,
	onClick,
	style,
	className,
	children,
}: {
	bounce?: number
	onClick?: any
	style?: any
	className?: string
	children: JSX.Element | JSX.Element[]
}) => (
	<motion.div
		onClick={() => onClick && onClick()}
		whileHover={{ scale: 1 + bounce }}
		whileTap={{ scale: 1 - bounce }}
		className={className}
		style={style}
	>
		{children}
	</motion.div>
)

export default ClickBounce

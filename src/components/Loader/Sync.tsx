import Loader from 'react-spinners/SyncLoader'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
	loading: boolean
	position?: string
}

const SyncLoader = ({ loading, position }: Props) => {
	return (
		<AnimatePresence>
			{loading && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={`${position ? position : 'fixed'} flex w-full h-full z-[100] justify-center items-center rounded-md bg-black/70`}
				>
					<Loader color='#CA205A' size={8} speedMultiplier={0.2} />
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default SyncLoader

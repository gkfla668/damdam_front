import { ReactNode, useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'

const DraggableBox = ({ className, children }: { className?: string; children: ReactNode }) => {
	const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
	const { events } = useDraggable(ref)

	return (
		<div className={`scroll-box scroll-visible-none ${className}`} {...events} ref={ref}>
			{children}
		</div>
	)
}

export default DraggableBox

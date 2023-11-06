import moment from 'moment'
import { makeId } from 'utils/helpers/generator'
import { IDebateToJSON } from 'types/debate/info'
//-assets
import PeopleSVG from 'public/icons/icon_people.svg'
import CalendarSVG from 'public/icons/icon_calendar.svg'

interface Props {
	data: IDebateToJSON
	column?: number
	gap?: number
	onClick: any
}

const colors = {
	'시작 전': {
		text: '#4DCB96',
		border: '#4DCB96',
	},
	'진행 중': {
		text: '#ED7743',
		border: '#ED7743',
	},
	종료: {
		text: '#ACB1BA',
		border: '#FFFFFF',
	},
	취소: {
		text: '#ACB1BA',
		border: '#FFFFFF',
	},
}

const DebateItemCard = ({ data, column = 3, gap = 40, onClick }: Props) => {
	const color = colors[data.status]

	return (
		<div
			onClick={() => onClick && onClick()}
			className={`debate-card flex flex-col border-2 rounded-2xl cursor-pointer`}
			style={{
				width: `calc(${100 / column}% - ${gap}px + ${gap / column}px)`,
				borderColor: color.border,
			}}
		>
			<div className='flex flex-col justify-between grow px-6 py-7 border-b border-[#E5E8EC]'>
				<span className='mb-2 font-extrabold md:text-sm' style={{ color: color.text }}>
					{data.status}
				</span>
				<span className='mb-2 font-extrabold leading-8 md:text-lg text-main-900'>{data.title}</span>

				<div className='flex flex-row flex-wrap items-center gap-2'>
					{data?.categorys?.map((str) => (
						<span key={makeId(12)} className='text-sm font-normal text-blue'>
							#{str}
						</span>
					))}
				</div>
			</div>

			<div className='flex flex-row px-6 py-5'>
				<CalendarSVG width={16} height={16} className='mr-2' />
				<span className='mr-3 text-sm font-extrabold text-main-900'>{moment(data?.startAt).format('YYYY.MM.DD a hh:mm')}</span>
				<PeopleSVG width={16} height={16} className='mr-2' />
				<span className='text-sm font-extrabold text-main-900'>
					{data.maxUsers}:{data.maxUsers}
				</span>
			</div>
		</div>
	)
}

export default DebateItemCard

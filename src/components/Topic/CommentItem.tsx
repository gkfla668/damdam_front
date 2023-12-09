import styled from 'styled-components'

const CommentItem = ({ userId, comment, time }: { userId: string; comment: string; time: string }) => {
	return (
		<div className='flex items-start gap-6'>
			<UserId>{userId}****</UserId>
			<div className='flex items-center justify-center gap-2'>
				<Comment>{comment}</Comment>
				<Time>{time}</Time>
			</div>
		</div>
	)
}

const UserId = styled.p`
	width: 14%;
	font-weight: 800;
	font-size: 14px;
	color: #383b40;
	line-height: 22px;
	letter-spacing: -1px;

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
	}
`
const Comment = styled.p`
	font-weight: 400;
	font-size: 14px;
	line-height: 22px;
	letter-spacing: -1px;

	color: #383b40;

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
	}
`

const Time = styled.p`
	color: #747983;
	font-size: 12px;
	white-space: nowrap;
`

export default CommentItem

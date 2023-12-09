import styled from 'styled-components'

const QuestionItem = ({ title, type }: { title: string; type?: string }) => {
	return <Item type={type}>{title}</Item>
}

const Item = styled.li<{ type?: string }>`
	cursor: pointer;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	padding: 12px 24px;

	color: ${(props) => (props.type ? '#324478' : '#383b40')};
	background-color: ${(props) => (props.type ? '#e7edfd' : '')};
	font-size: 14px;
	font-weight: ${(props) => (props.type ? '900' : '400')};
	line-height: 24px; /* 150% */
	letter-spacing: -1px;
	border-radius: 28px;

	&:hover {
		background-color: #f4f6f8;
	}

	&:active {
		color: var(--primary-color, #324478);
		font-weight: 800;
		line-height: 24px; /* 150% */

		background-color: var(--defalut, #e7edfd);
	}

	@media screen and (max-width: 768px) {
		padding: 12px 20px;
	}
`

export default QuestionItem

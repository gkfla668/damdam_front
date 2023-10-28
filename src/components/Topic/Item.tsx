import styled from 'styled-components'

const Item = styled.li`
	padding: 16px 32px;
	font-weight: 900;
	text-align: center;

	color: #383b40;

	background: #f2f4f6;
	border-radius: 32px;
	cursor: pointer;

	&:hover {
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.16);
	}

	&:active {
		box-shadow: none;
		background: var(--defalut, #e7edfd);
	}
`
const TopicItem = ({ title }: { title: string }) => {
	return <Item>{title}</Item>
}

export default TopicItem

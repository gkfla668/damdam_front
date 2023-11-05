import styled from 'styled-components'

const Item = styled.li<{ isHome?: boolean }>`
	padding: ${(props) => (!props.isHome ? '0.8rem 2.4rem' : '1.2rem 3.2rem')};

	font-weight: 900;
	font-size: ${(props) => (!props.isHome ? '1.3rem' : '1.4rem')};
	line-height: 30px; /* 187.5% */
	letter-spacing: -1px;
	white-space: nowrap;
	text-align: center;

	color: #383b40;
	background: ${(props) => (!props.isHome ? 'white' : '#f2f4f6')};
	border-radius: 3.2rem;

	cursor: pointer;

	&:hover {
		box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.16);
	}

	&:active {
		box-shadow: none;
		background: var(--defalut, #e7edfd);
	}

	@media screen and (max-width: 768px) {
		font-size: 1.4rem;
		width: 100%;
		padding: 0.8rem 0rem;
	}
`
const TopicItem = ({ title, onClick, isHome }: { title: string; onClick?: () => void; isHome?: boolean }) => {
	return (
		<Item onClick={onClick} isHome={isHome}>
			{title}
		</Item>
	)
}

export default TopicItem

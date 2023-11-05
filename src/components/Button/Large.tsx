import styled from 'styled-components'

export const ButtonStyle = styled.button`
	width: 100%;
	padding: 1.4rem 0;

	font-size: 1.6rem;
	font-weight: 800;
	line-height: 3rem;
	text-align: center;

	color: white;
	background: linear-gradient(180deg, #515f8d 0%, #3b4b7e 100%);
	border-radius: 3rem;

	&:hover {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	&:active {
		background: linear-gradient(180deg, #324478 0%, #152750 100%);
		box-shadow: none;
	}

	@media screen and (max-width: 768px) {
		font-size: 1.4rem;
		padding: 1rem 0;
	}
`
const LargeButton = ({ text, onClick }: { text: string; onClick?: () => void }) => {
	return <ButtonStyle onClick={onClick}>{text}</ButtonStyle>
}

export default LargeButton

import styled from 'styled-components'

export const ButtonStyle = styled.button`
	padding: 16px 0;
	width: 464px;

	color: white;
	font-size: 18px;
	font-weight: 800;
	line-height: 30px;
	text-align: center;

	background: linear-gradient(180deg, #515f8d 0%, #3b4b7e 100%);
	border-radius: 30px;

	&:hover {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	&:active {
		background: linear-gradient(180deg, #324478 0%, #152750 100%);
		box-shadow: none;
	}
`
const LargeButton = ({ text }: { text: string }) => {
	return <ButtonStyle>{text}</ButtonStyle>
}

export default LargeButton

import styled from 'styled-components'

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;

	margin-bottom: 2rem;

	@media screen and (max-width: 768px) {
		margin-bottom: 1.2rem;
	}
`

export const InputLabel = styled.label`
	margin-left: 0.8rem;
	font-weight: 900;
	font-size: 1.6rem;

	@media screen and (max-width: 768px) {
		font-size: 1.4rem;
	}
`

export const Input = styled.input`
	border: none;
	border-radius: 2.8rem;
	padding: 1.6rem 2.4rem;
	background-color: #f4f6f8;
	margin-top: 0.8rem;
	margin-bottom: 0.4rem;

	@media screen and (max-width: 768px) {
		font-size: 1.2rem;
		padding: 1.2rem 2rem;
	}

	&::placeholder {
		color: #adb2bb;
		font-size: 1.4rem;
	}
`

export const MessageText = styled.p`
	color: #ff3a3a;
	font-size: 1.2rem;
`

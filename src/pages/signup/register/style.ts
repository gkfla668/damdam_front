import styled from 'styled-components'

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;

	margin-bottom: 20px;

	@media screen and (max-width: 768px) {
		margin-bottom: 12px;
	}
`

export const InputLabel = styled.label`
	margin-left: 8px;
	font-weight: 900;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
`

export const Input = styled.input`
	::placeholder {
		color: #adb2bb;
		font-size: 14px;
	}

	@media screen and (max-width: 768px) {
		font-size: 12px;
		padding: 12px 20px;
	}

	border: none;
	border-radius: 28px;
	padding: 16px 24px;
	background-color: #f4f6f8;
	margin-top: 8px;
	margin-bottom: 4px;
`

export const MessageText = styled.p`
	color: #ff3a3a;
	font-size: 12px;
`

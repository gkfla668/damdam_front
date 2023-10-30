import styled from 'styled-components'

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;

	margin-bottom: 20px;
`

export const InputLabel = styled.label`
	margin-left: 8px;
	font-weight: 900;
`

export const Input = styled.input`
	::placeholder {
		color: #adb2bb;
		font-size: 14px;
	}

	border: none;
	border-radius: 28px;
	padding: 12px 24px;
	background-color: #f4f6f8;
	margin-top: 8px;
	margin-bottom: 4px;
`

export const MessageText = styled.p`
	color: #ff3a3a;
	font-size: 12px;
`

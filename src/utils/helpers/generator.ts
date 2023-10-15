import { v4 } from 'uuid'

// unique ID
export const makeUUID = () => v4()
export const makeId = (length: number) => {
	let result = ''
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let charactersLength = characters.length

	for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength))

	return result
}

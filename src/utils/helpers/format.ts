export const comma = (x: number | string) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
export const won = (x?: number | string) => `\u{20A9} ${comma(x || 0)}`
export const str2phone = (str: string) =>
	str
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
		.replace(/(\-{1,2})$/g, '')

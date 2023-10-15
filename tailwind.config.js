/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [require('@tailwindcss/forms')],
	theme: {
		container: {
			center: true,
			padding: 20,
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1280px',
			},
		},
		extend: {
			fontFamily: {
				noto: ['NanumSquareRoundOTF', 'sans-serif'],
				sans: ['NanumSquareRoundOTF', 'sans-serif'],
			},
			colors: {
				neutral: {
					500: '#A8A8A8',
					600: '#D2D2D2',
					700: '#939393',
					800: '#555555',
					850: '#333333',
					900: '#111111',
				},
				gray: {
					100: '#F6F6F6',
					250: '#D9D9D9',
					300: '#CCCCCC',
					330: '#B4B4B4',
					600: '#888888',
					700: '#ADB2BB',
					800: '#333333',
					900: '#212121',
				},
				main: {
					900: '#383B40',
				},
				point: {
					900: '#324478',
				},
			},
		},
	},
}

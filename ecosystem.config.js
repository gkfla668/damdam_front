module.exports = {
	apps: [
		{
			name: 'frontend',
			script: 'npm',
			args: 'start',
			cwd: './',
			env_production: {
				NODE_ENV: 'production',
				PORT: '8080',
			},
		},
	],
}

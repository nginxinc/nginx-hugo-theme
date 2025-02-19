lint:
	npx eslint --config eslint.config.js 'assets/**/*.js'
lint-fix:
	npx eslint --config eslint.config.js 'assets/**/*.js' --fix
prettier:
	npx prettier --config .prettierrc --write 'assets/**/*.{js,json,css}'
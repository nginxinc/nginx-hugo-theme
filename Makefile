lint:
	npx eslint --config .eslintrc.json 'assets/**/*.js'
lint-fix:
	npx eslint --config .eslintrc.json 'assets/**/*.js' --fix
prettier:
	npx prettier --config .prettierrc --write 'assets/**/*.{js,json,css}'
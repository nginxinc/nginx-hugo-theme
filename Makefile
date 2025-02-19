ESLINT=npx eslint --config eslint.config.js 'assets/**/*.js'
STYLELINT=npx stylelint --config stylelint.config.js 'assets/css/v2/**/*.css'
PRETTIER=npx prettier --config .prettierrc --write 'assets/**/*.{js,json,css}'

lint-js:
	$(ESLINT)

lint-js-fix:
	$(ESLINT) --fix

lint-css:
	$(STYLELINT)

lint-css-fix:
	$(STYLELINT) --fix

lint-all:
	make lint-js lint-css

prettier:
	$(PRETTIER)
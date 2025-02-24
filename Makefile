BIOME_BASE_CMD := $(if $(shell which biome),biome,npx @biomejs/biome)
BIOME_CONFIG_PATH := --config-path="biome.json"
WRITE_FLAG := --write

.PHONY: list help
list help::
	$(info Available Make targets:)
	@echo "<COMMON>"
	@echo "		list | help:  		Print these available make targets"
	@echo "<LINTING AND FORMATTING>"
	@echo "		 biome-format: 		Runs the biome formatter."
	@echo "		   biome-lint: 		Runs the biome linter."
	@echo "		    biome-all:		Runs both the lint and formatting commands."
	@echo "build-example-site:		Builds hugo exampleSite."
	@echo "  (Set BIOME_ARGS to add additional arguments to biome command (ex: make biome-all BIOME_ARGS=write))"

.PHONY: biome-format biome-lint biome-all setup-pre-commit build-example-site
BIOME_ARGS ?= 
FLAG :=
ifeq ($(BIOME_ARGS), write)
	FLAG := $(WRITE_FLAG)
endif

biome-format:
	$(BIOME_BASE_CMD) format $(BIOME_CONFIG_PATH) $(FLAG)
biome-lint:
	$(BIOME_BASE_CMD) lint $(BIOME_CONFIG_PATH) $(FLAG)
biome-all:
	$(BIOME_BASE_CMD) check $(BIOME_CONFIG_PATH) $(FLAG)

setup-pre-commit:
	@if ! command -v pre-commit &> /dev/null; then \
		echo "WARNING: 'pre-commit' is not installed. Please install it using: pip install pre-commit or brew install pre-commit"; \
	else \
		echo "pre-commit is installed! Proceeding with hook installation."; \
		pre-commit install; \
		pre-commit install --hook-type commit-msg; \
		echo "pre-commit hooks have been successfully installed."; \
	fi

build-example-site:
	cd exampleSite && hugo mod get && hugo build --gc -e production

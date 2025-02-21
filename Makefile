BIOME_BASE_CMD := npx @biomejs/biome
BIOME_CONFIG_PATH := --config-path="biome.json"
WRITE_FLAG := --write

.PHONY: list help
list help::
	$(info Available Make targets:)
	@echo "<COMMON>"
	@echo "		list | help:  		Print these available make targets"
	@echo "<LINTING AND FORMATTING>"
	@echo "		biome-format: 		Runs the biome formatter."
	@echo "		  biome-lint: 		Runs the biome linter."
	@echo "		   biome-all:		Runs both the lint and formatting commands."
	@echo "  (Set BIOME_ARGS to add additional arguments to biome command (ex: make biome-all BIOME_ARGS=write))"

.PHONY: biome-format biome-lint biome-all 
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
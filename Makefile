# Read the Biome version from biome.json "$schema"
# Uses BSD/GNU compatible sed with -E for extended regex.
BIOME_VERSION := $(shell sed -nE 's/.*schemas\/([0-9]+\.[0-9]+\.[0-9]+)\/schema\.json.*/\1/p' biome.json)

# Detect local biome and its version (if any)
HAVE_BIOME := $(shell command -v biome >/dev/null 2>&1 && echo yes || echo no)
LOCAL_BIOME_VERSION := $(shell biome --version 2>/dev/null | sed -E 's/[^0-9]*([0-9]+\.[0-9]+\.[0-9]+).*/\1/')

# Choose which command to run. Prefer local only if versions match.
ifeq ($(strip $(BIOME_VERSION)),)
  $(warning Could not determine Biome version from biome.json; defaulting to npx @biomejs/biome)
  BIOME_BASE_CMD := npx -y @biomejs/biome
else
  ifeq ($(HAVE_BIOME),yes)
    ifeq ($(LOCAL_BIOME_VERSION),$(BIOME_VERSION))
      BIOME_BASE_CMD := biome
    else
      $(warning Found biome $(LOCAL_BIOME_VERSION) on PATH, but required $(BIOME_VERSION). Falling back to npx.)
      BIOME_BASE_CMD := npx -y @biomejs/biome@$(BIOME_VERSION)
    endif
  else
    BIOME_BASE_CMD := npx -y @biomejs/biome@$(BIOME_VERSION)
  endif
endif

# Optional: allow forcing use of local biome anyway (not recommended)
# Usage: make ... FORCE_LOCAL_BIOME=1
ifeq ($(FORCE_LOCAL_BIOME),1)
  BIOME_BASE_CMD := biome
endif

WRITE_FLAG := --write

.PHONY: list help biome-format biome-lint biome-all setup-pre-commit tests build-example-site check-biome install-help tests-update-screenshots

list help:
	@echo "Available Make targets:"
	@echo "<COMMON>"
	@echo "    list | help:   Print these available make targets"
	@echo "<LINTING AND FORMATTING>"
	@echo "    biome-format: Runs the biome formatter."
	@echo "    biome-lint: Runs the biome linter."
	@echo "    biome-all: Runs both the lint and formatting commands."
	@echo "(Set BIOME_ARGS=write to enable --write, e.g.: make biome-all BIOME_ARGS=write)"
	@echo "<BUILD>"
	@echo "    build-example-site: Builds hugo exampleSite."
	@echo "<PRE-COMMIT>"
	@echo "    setup-pre-commit: Sets up pre-commit (assuming it is installed)"
	@echo "<PLAYWRIGHT TESTS>"
	@echo "    tests: Runs playwright against the new theme."
	@echo "    tests-update-screenshots: Runs playwright against the new theme and generates screenshots."
	@echo "<BIOME UTILITIES>"
	@echo "    check-biome: Shows required vs local biome versions and the command that will run."
	@echo "    install-help: Shows how to install Biome globally via brew or npm."

FLAG :=
ifeq ($(BIOME_ARGS), write)
FLAG := $(WRITE_FLAG)
endif

biome-format:
	$(BIOME_BASE_CMD) format $(FLAG)

biome-lint:
	$(BIOME_BASE_CMD) lint $(FLAG)

biome-all:
	$(BIOME_BASE_CMD) check $(FLAG)

setup-pre-commit:
	@if ! command -v pre-commit >/dev/null 2>&1; then \
		echo "WARNING: 'pre-commit' is not installed. Please install it using: pip install pre-commit or brew install pre-commit"; \
	else \
		echo "pre-commit is installed! Proceeding with hook installation."; \
		pre-commit install; \
		pre-commit install --hook-type commit-msg; \
		echo "pre-commit hooks have been successfully installed."; \
	fi

build-example-site:
	cd exampleSite && hugo mod get && hugo build --gc -e production

tests:
	cd tests && npx playwright test

tests-update-screenshots:
	cd tests && npx playwright test --update-snapshots

check-biome:
	@echo "Required Biome version: $(BIOME_VERSION)"
	@echo "System Biome version:   $(LOCAL_BIOME_VERSION)"
	@echo "Command that will run:  $(BIOME_BASE_CMD)"
	@if ! command -v biome >/dev/null 2>&1 || [ "$(LOCAL_BIOME_VERSION)" != "$(BIOME_VERSION)" ]; then \
		echo ""; \
		echo "⚠️  Local biome version does not match required."; \
		$(MAKE) install-help; \
	fi

install-help:
	@echo ""
	@echo "🛠️  Install options for biome v$(BIOME_VERSION):"
	@echo ""
	@echo "1) 🧪 Install manually via Homebrew (advanced):"
	@echo "   # Find the correct commit SHA for biome $(BIOME_VERSION) here:"
	@echo "   # https://github.com/Homebrew/homebrew-core/commits/master/Formula/biome.rb"
	@echo "   curl -sSL https://raw.githubusercontent.com/Homebrew/homebrew-core/<COMMIT_SHA>/Formula/biome.rb -o biome.rb"
	@echo "   brew install ./biome.rb"
	@echo "   brew pin biome"
	@echo ""
	@echo "2) 🚀 Install via npm (global):"
	@echo "   npm install -g @biomejs/biome@$(BIOME_VERSION)"
	@echo ""
	@echo "3) 🧰 Use temporarily via npx (auto fallback in Makefile):"
	@echo "   npx -y @biomejs/biome@$(BIOME_VERSION) <command>"
	@echo ""
	@echo "Note: This Makefile will automatically fall back to npx if the right version is not found locally."

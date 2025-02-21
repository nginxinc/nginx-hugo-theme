# Contributing Guidelines

The following is a set of guidelines for contributing to this project. We really appreciate that you are considering contributing!

#### Table Of Contents

[Getting Started](#getting-started)

[Contributing](#contributing)

[Code Guidelines](#code-guidelines)

[Code of Conduct](https://github.com/nginxinc/nginx-hugo-theme/blob/main/CODE_OF_CONDUCT.md)

## Getting Started

Follow our [Getting Started Guide](https://github.com/nginxinc/nginx-hugo-theme/blob/main/README.md#Getting-Started) to get this project up and running.

<!-- ### Project Structure (OPTIONAL) -->

## Contributing

### Pre-commit setup
We use [pre-commit](https://pre-commit.com/#install) for local pre-commit hooks.
To get setup:
- Install [pre-commit ](https://pre-commit.com/#install)
- Run the make target `make setup-pre-commit`

### Report a Bug

To report a bug, open an issue on GitHub with the label `bug` using the available bug report issue template. Please ensure the bug has not already been reported. **If the bug is a potential security vulnerability, please report it using our [security policy](https://github.com/nginxinc/nginx-hugo-theme/blob/main/SECURITY.md).**

### Suggest a Feature or Enhancement

To suggest a feature or enhancement, please create an issue on GitHub with the label `enhancement` using the available [feature request template](https://github.com/nginxinc/nginx-hugo-theme/blob/main/.github/feature_request_template.md). Please ensure the feature or enhancement has not already been suggested.

### Open a Pull Request

- Fork the repo, create a branch, implement your changes, add any relevant tests, submit a PR when your changes are **tested** and ready for review.
- Fill in [our pull request template](https://github.com/nginxinc/nginx-hugo-theme/blob/main/.github/pull_request_template.md).

Note: if you'd like to implement a new feature, please consider creating a [feature request issue](https://github.com/nginxinc/nginx-hugo-theme/blob/main/.github/feature_request_template.md) first to start a discussion about the feature.

## Git Guidelines

- Keep a clean, concise and meaningful git commit history on your branch (within reason), rebasing locally and squashing before submitting a PR.
- Split your changes into separate, atomic commits (i.e. A commit per feature or fix, where the build, tests and the system are all functioning).
- Make sure your commits are rebased on the `main` branch.
- Wrap your commit messages at 72 characters.
- The first line of the commit message is the subject line, and must have the format "Category: Brief description of what's being changed".
- The category should reflect the part of the Hugo theme you're working on, such as `Layouts`, `Styles`, `Templates`, `Assets`, `Config`, or `Docs`.
  - **Examples:**
    - `Layouts: Fix navigation menu rendering issue`
    - `Styles: Update typography for post headings`
    - `Templates: Add archive page template`
    - `Assets: Optimize images and minify JS files`
    - `Config: Fix site URL for production builds`

  - Avoid generic categories like "`Theme`" or "`Misc`" unless the change truly applies across the entire project and can't be narrowed down further.

  - You may combine categories with `+` if multiple areas are affected.
    - Example: `Layouts+Styles: Add dark mode toggle styles and layout`
- Write the commit message subject line in the imperative mood ("Foo: Change the way dates work", not "Foo: Changed the way dates work").
- Write your commit messages in proper English, with care and punctuation.
- Amend your existing commits when adding changes after a review, where relevant.
- Mark each review comment as "resolved" after pushing a fix with the requested changes.
- Add your personal copyright line to files when making substantive changes. (Optional but encouraged!)
- Check the spelling of your code, comments and commit messages.

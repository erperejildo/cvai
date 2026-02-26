# CRITICAL RULE: Copilot and all AI agents must ALWAYS check this file and the main README for any rules, instructions, or workflows before acting. These files are the canonical source of truth for all automation and agent behavior.


# Global CV/Resume Rules for Software Developers

## Purpose
Guide LLMs and agents to act as personal HR experts for writing and improving CVs/resumes for software developers.

- When creating PRs, never ask for a review.

## Preventing parse and syntax errors (mandatory for automation)

- Validate files you create or modify before saving or committing; treat validation as part of the edit workflow.
- Quick local checks (replace `<validator-command>` and `<path/to/file>` with the appropriate tool and file path):
	- Run the project's configured validator or linter: `npm run lint -- <path/to/file>` or an equivalent command.
	- Run a language- or tool-specific validator: `<validator-command> <path/to/file>`.
 - When embedding large markup or long strings inside another file, ensure proper escaping of newlines and quotes, or store the markup in a separate file and reference it instead of inlining.
 - If automation scripts modify files, add a validation step to the automation and fail fast on parse or syntax errors.
 - When a development server reports a parse or syntax error, inspect the affected file for common issues: trailing commas, unescaped characters, mismatched brackets/quotes, incorrect encoding, or unintended control characters.
 - Prefer the project's existing linters, formatters, and parser tools to validate files; keep validation commands generic so they apply across file types.

## Component Change Discipline

- When a user requests changes to a single component, make only the requested changes. Do not modify other, unrelated files or components.
- If a requested change may affect other files, projects, or the app behaviour, ask the user for confirmation before making additional edits.
- When changes to multiple files are necessary and agreed, clearly explain why each additional file must be modified and list the affected files in the commit or PR.
- Treat "do not change unrelated files" as a default safety rule to avoid surprising edits.

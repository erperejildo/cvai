---
description: 'Creates short and detailed CV from an actual CV, improving it according the our rules'
---

# CV Generation Prompt
Create an improved version of you resume from [../../resume.md](../../resume.md). Show the user identified profile/job after reading these offers. This will create 2 different types of resume:

## Short CV
Don't generate this just for now!
### Rules


## Detailed CV
 Ensure all jobs, roles, and relevant experiences from resume.md are included in the detailed CV, unless explicitly excluded by user instruction.
 
 **Titles Rule:** When generating cv.json, always create at least one (and at most three) main titles based on the CV information. Titles should reflect the user's primary professional roles or expertise and must not be left empty.
**Contact Info & Name/Titles Handling**
- Do NOT include contact info (email, phone, LinkedIn, etc.) in the resume markdown body. All contact info must be extracted and placed only in the sidebar component.
- Parse the resume markdown to identify and structure:
	- Section headers (e.g., 'Professional Experience', 'Education', 'Skills', etc.)
	- Subheaders: job/role titles and company/institution (e.g., 'ENCARGADA — Zapatería El Caballito')
	- Subsubheaders: dates and location (e.g., 'November 2024 – Present · Jerez de la Frontera')
	- Description: bullet points or paragraphs describing responsibilities/achievements
- Use the following mapping for improved styling:
	- Section header: h3 (or site standard heading)
	- Subheader: bold job/role title, company/institution inline or on next line
	- Subsubheader: italic or secondary style for dates/location
	- Description: bullet points or paragraphs
- Example parsing:
	- 'Professional Experience' → section header
	- 'ENCARGADA — Zapatería El Caballito November 2024 – Present · Jerez de la Frontera' → subheader (title/company), subsubheader (date/location)
	- Bullet points below → description
- Ensure all sections are parsed and structured for consistent rendering in the site.
- Always proofread for typos and grammar.

**Resume Markdown Parsing**
- When converting resume.md to cv.json, remove all lines containing contact info, name, or titles.
- Identify and extract section headers, subheaders, subsubheaders, and descriptions as described above.
- Structure cv.json.sections as an ordered array of {section_title, items}, where items include parsed subheaders, subsubheaders, and descriptions.
- For each work experience entry, always include a brief company description (if available) immediately after the job/company/dates and before the bullet points. This provides context about the company and is considered best practice for detailed CVs.

## Global Rules

### File Removal Rule
Before generating a new CV, always delete `detailed-CV.md`, `web-cv/public/resumes/resume.md`, and `web-cv/src/data/cv.json`. Do not overwrite or append; remove these files first, then generate them again. This ensures the site and CV remain fully in sync and up-to-date, and prevents conflicts or stale data.

## Web (Website update instructions)

When a new `detailed-CV.md` is generated, update the website automatically. These instructions must be followed exactly by an LLM or automation agent when performing file edits in `web-cv`.

**Critical Rule:** The only file that can be changed in `/web-cv` is `cv.json`. All site values and content must update from `cv.json`. Editing any other file in `/web-cv` will break the website and is strictly forbidden.

Goals
- Keep a single source of truth: the generated `detailed-CV.md` drives the website content.
- Preserve site styling and components; only update content and structured data inserted into components.

Required mapping
- Header: update site header with `Name` and `LastName` (prominent) and `Titles` placed under the name (secondary line).
	- Files to update: `web-cv/src/components/Header/*`, `web-cv/src/components/Profile/*` (if present).
- Sidebar: extract all contact methods from the CV and create contact links.
	- Map contact types to URLs:
		- `email` -> `mailto:EMAIL`
		- `phone` -> `tel:PHONE`
		- `linkedin` -> full LinkedIn URL (use provided handle or full URL)
		- `github` -> full GitHub URL
		- `twitter` -> full Twitter URL
		- `facebook` -> full Facebook URL (if CV includes a Facebook link or handle)
		- any other URL -> use as-is
	- Files to update: `web-cv/src/components/Sidebar/Sidebar.tsx`, `web-cv/src/components/ContactCard/ContactCard.tsx`
	- Ensure each contact shows an icon and an active anchor (`<a>`) pointing to the correct URL. If an icon does not exist (e.g., Facebook), add the icon import and component usage consistent with existing icons.
- Page content: render the CV sections in this order and with consistent formatting:
	1. Resume / Summary (if present) — always render at top.
	2. Professional experience and Education — whichever appears first in the CV should be rendered first; keep the same relative ordering and reverse-chronological ordering within each section.
	3. Other sections (Skills, Projects, Certifications) — maintain order from the CV.
	- Files to update: `web-cv/src/components/ResumeMarkdown/ResumeMarkdown.tsx` (or the component that renders resume markdown/content). Also update `web-cv/public/resumes/resume.md` with the generated `detailed-CV.md` content (plain copy) so static routing or previews work.

Formatting and style rules (must be consistent across the site)
- Section titles: use the same heading level (e.g., `h3`) for all section headers.
- Job titles / education titles: bold the title and include company/institution on the next line or inline per the site's current pattern.
- Dates: render dates in the same format everywhere (prefer `MMM YYYY` or `YYYY-MM` depending on site conventions). Choose one consistent format and apply across all sections.
- Descriptions: use bullets for responsibilities/achievements. Keep indentation and spacing consistent with other entries.
- Preserve CSS classes and structure used by existing components; only change text nodes and lists.

Implementation steps (LLM-friendly, step-by-step)
1. Parse the generated `detailed-CV.md` into a structured data object (JSON) with fields: `name`, `lastname`, `titles` (array or string), `contacts` (array of {type, value}), `sections` (ordered array of {section_title, items}).
2. Update `web-cv/public/resumes/resume.md` by replacing its content with the full markdown of `detailed-CV.md`.
3. Update header/profile components:
	 - Replace name and titles in `Header` / `Profile` components. If the site uses props or a JSON file, update that source. If the header contains hard-coded strings, replace only the text nodes.
4. Update Sidebar/ContactCard:
	 - For each contact entry in the parsed JSON, add or update an anchor link with correct `href` and add the corresponding icon import/use. Do not remove existing contacts not present in the CV; instead, prefer CV-provided contacts and remove duplicates.
5. Update resume rendering component(s):
	 - Ensure the resume rendering component receives the parsed sections in the required order (Resume/Summary first, then Experience/Education per CV order).
	 - Replace or inject the markdown/HTML content into `ResumeMarkdown` or equivalent, preserving the component's wrappers and CSS classes.
6. Update Footer:
	 - Replace the name displayed in the footer with the `name lastname` from the CV.
7. Run a local quick check (lint/build not required): verify that files are valid UTF-8 and JSX/TSX imports remain unchanged except for icon imports added. If icon imports were added, ensure they use the project's existing icon source (SVG, FontAwesome, or similar) and match import style.
8. Commit message suggestions (for humans): "chore(site): sync website content from generated detailed-CV.md"

Safety and best practices for the LLM
- Do not change component structure or CSS class names. Only change content and add icon imports when necessary.
- When adding icon imports, follow the same pattern used by other icons in the codebase (same folder, same naming style).
- If multiple contact values exist for the same type (e.g., two emails), keep the most professional one first (prefer `@` email that matches domain or LinkedIn email), but keep both if both are present.
- If uncertain about a mapping (e.g., social handle vs URL), prefer to create a full absolute URL rather than a relative or ambiguous string.

Example minimal replacement sequence the agent should perform
1. Read `detailed-CV.md` -> produce `cv.json`.
2. Overwrite `web-cv/public/resumes/resume.md` with `detailed-CV.md` content.
3. Patch `web-cv/src/components/Profile/Profile.tsx` to set `name` and `titles` from `cv.json`.
4. Patch `web-cv/src/components/Sidebar/Sidebar.tsx` (or `ContactCard`) to iterate `cv.json.contacts` and render links + icons.
5. Patch `web-cv/src/components/ResumeMarkdown/ResumeMarkdown.tsx` to render `cv.json.sections` in the correct order, applying consistent formatting rules.

Outcome
- After these steps, the web site should reflect the generated `detailed-CV.md` content exactly (name, titles, contacts, resume and sections), with consistent styling and working links.

Note: these instructions are intentionally prescriptive to make automated LLM edits deterministic and reversible. If the site has a different component naming convention, follow the nearest equivalent component and keep edits minimal.

## Automation requirements (additional prompt data to enable full, non-interactive site sync)

To perform the full automated mapping and update the `web-cv` site without asking, the prompt must include these explicit defaults and conventions. Add or keep these values in the prompt so an LLM or automation agent can run end-to-end deterministically.

- **Component file paths (confirm or change if different):**
	- Header/Profile: `web-cv/src/components/Profile/Profile.tsx`
	- Sidebar: `web-cv/src/components/Sidebar/Sidebar.tsx`
	- Contact card: `web-cv/src/components/ContactCard/ContactCard.tsx`
	- Resume renderer: `web-cv/src/components/ResumeMarkdown/ResumeMarkdown.tsx`
	- Public resume copy: `web-cv/public/resumes/resume.md`

- **CV JSON schema (exact output expected from parser):**
	```json
	{
		"name": "Daniel",
		"lastname": "Rodríguez Ramírez",
		"titles": ["Frontend Developer","Mobile Developer"],
		"contacts": [
			{"type":"email","label":"Email","value":"d15_1_89@msn.com","href":"mailto:d15_1_89@msn.com"},
			{"type":"linkedin","label":"LinkedIn","value":"Daniel Rodríguez Ramírez","href":"https://..."},
			{"type":"github","label":"GitHub","value":"erperejildo","href":"https://github.com/erperejildo"}
		],
		"sections": [
			{"section_title":"Resume Summary","items":[{"content":"..."}]},
			{"section_title":"Professional Experience","items":[{"title":"Senior Front End Developer","company":"Own","dates":"Feb 2014 – present","bullets":["..."]}]}
		]
	}
	```

- **Icon handling policy:**
	- Preferred: use project SVG/icon components if available under `web-cv/src/assets` or existing icon pattern in components. Use the same import style as nearby components.
	- Fallback: if no SVG/icon is available, render a best-fit emoji (existing app uses emojis) or a minimal inline SVG so no external dependency is required.
	- When adding imports, follow the repository's import conventions and keep changes minimal.

- **Date format (site-wide):** use `MMM YYYY` (e.g., "Feb 2020") by default unless the site demonstrates a different format.

- **Overwrite & conflict policy:**
	- Replace hard-coded name/titles/text nodes in component files with values from `cv.json` (prefer setting props or small data objects exported from a single `cv.json` or `cv-data.ts` file).
	- Do not change CSS class names, layout structure, or component APIs beyond adding safe props/exports.
	- Do not remove existing contacts; prefer CV-provided contacts and deduplicate.

- **Permissions for code edits:**
	- Agent may add small, localized changes required to render `cv.json` (e.g., import `cv.json`, add a mapping loop in `ContactCard`, or add icon imports). Avoid large refactors.

- **Commit & branching defaults:**
	- Create a branch named `auto/cv-sync`.
	- Commit changes with message: `chore(site): sync website content from generated detailed-CV.md`.
	- Default behavior: create commits locally in the workspace. Pushing to remote and opening a PR requires explicit permission — see questions below.

- **Build / lint policy:** do not run `npm build` or autofix lint issues by default. Optionally run a quick UTF-8 and syntax check for edited files.

- **Safety & verification:** after edits, the agent should verify:
	- `web-cv/public/resumes/resume.md` exactly matches `detailed-CV.md` content.
	- Header title and footer name equal `name lastname` from `cv.json`.
	- Contact anchors use correct `href` mapping rules.

## Owner decisions (defaults set)

The following defaults are supplied so an LLM or automation agent can perform the full, non-interactive site sync without asking further questions:

1. Automatic push/PR: `no` — do NOT push or open PRs. (A separate PR-generation prompt handles push/PR workflows.)
2. Base branch for PRs (if later requested): `main`.
3. Icon strategy: prefer project SVG/icon components when available; if an icon is not available, use a generic link/URL icon as the fallback.

### Icon Selection Rules for Contact Methods (Expanded)

1. **Brand/Service-Specific First:**  
	- Always use a brand, service, or platform-specific icon if one exists (e.g., GitHub, LinkedIn, Stack Overflow, Twitter, etc.).
	- Prefer the most recognizable or official icon for the service (e.g., GitHub’s octocat, Stack Overflow’s stack/laptop, LinkedIn’s “in” logo).

2. **Category/Function Icon Second:**  
	- If no brand-specific icon is available, use a generic icon that clearly represents the function or category (e.g., envelope for email, phone for phone number, briefcase for work, globe for website).

3. **Fallback/Default Icon Last:**  
	- Only use a generic “share” or “link” icon if the contact method is truly unusual or cannot be represented by a brand or category icon.
	- The default icon should be a last resort, not the standard for well-known services.

4. **Never Use Default for Major Platforms:**  
	- Never use the default icon for major platforms (GitHub, Stack Overflow, LinkedIn, Twitter, etc.)—always try to find a more specific or creative icon.

5. **Consistency:**  
	- Use the same icon for the same service across all resumes and outputs for consistency.

6. **Creativity Encouraged:**  
	- If a brand icon is not available, use a creative, intuitive icon that best represents the service or its function.

**Example Table:**

| Service         | Preferred Icon         | Fallback Icon      |
|-----------------|-----------------------|--------------------|
| GitHub          | Octocat/Mark          | Code/Terminal      |
| Stack Overflow  | Stack/Laptop          | Q&A/Forum          |
| LinkedIn        | “in” Logo/Briefcase   | Business Card      |
| Email           | Envelope              | Mailbox            |
| Website         | Globe                 | Link/Chain         |
| Twitter/X       | Bird/X Logo           | Hashtag            |
| Other/Unknown   | Relevant Category     | Share/Link         |

Add these rules to ensure the generator always tries to find the best possible icon for each contact method, only using the default as a true fallback.
4. Date format: follow the date format used in the generated `detailed-CV.md` (use the full month name + year as shown, e.g. `February 2020`).

These defaults are authoritative for the automated run of this prompt. If you want different behavior, update these values in the prompt file before running the automation.
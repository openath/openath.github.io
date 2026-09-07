# Release-notes agent — specification

Brief for a Claude Code agent run **inside the OpenTrack product code repo** to
draft month-by-month release notes for the marketing site
(`openath.github.io`, published at `https://opentrack.run/product/releasenotes/`).

The site side is already built. Your job is to produce the **data files** that
feed it. Nothing you write is published without a human review pass.

---

## 1. What you produce

One YAML file per calendar year, matching the schema the site already renders.

- **Path in the site repo:** `_data/releasenotes/<year>.yml` (e.g. `_data/releasenotes/2024.yml`)
- **Worked example to copy:** `_data/releasenotes/2023.yml` in the site repo — same
  structure, real content. Match its shape exactly.
- **Renderer (for reference, do not edit):** `_includes/release-notes-year.html`

### Schema

```yaml
year: "2024"
months:
  - id: "2024-11"            # YYYY-MM. Drives the anchor id="rn-2024-11". Required.
    label: "November 2024"   # Human label. Required.
    summary: >               # Optional. One sentence, only if the month has a theme.
      Seeding went fully World Athletics-compliant and entries gained waitlists.
    groups:
      - heading: "Seeding"   # Short category. See §6 for the standard set.
        items:
          - "Plain-string item — one sentence, past tense, benefit first."
          - text: "Item that should link to a product page."
            product: competition-management   # optional; -> /product/<slug>.html
```

- **Newest month first** within a file.
- Months with no notable user-facing change: **omit entirely**. Do not pad.
- Valid `product` slugs: `competition-management`, `federation-admin`,
  `statistics-rankings`, `results-capture`, `entries-system`,
  `open-reference-data`, `league-management`, `virtual-racing`. Only add a link
  when the item is genuinely about that product area.

---

## 2. Sources — in priority order

Use the most curated source available. Raw commit logs are the **last** resort.

1. **Merged pull requests** — title + description + labels. The PR description is
   usually already a human summary of user impact. Best source.
2. **Release tags / GitHub Releases** — if the repo tags releases, the tag
   messages and any generated notes.
3. **`CHANGELOG.md`** or equivalent, if one exists.
4. **Closed issues** with `feature` / `enhancement` / `customer` labels, grouped
   by their close date.
5. **Commit messages** — only to corroborate or date something from 1–4, or to
   catch a shipped change that never got a PR. Never transcribe `git log`
   wholesale.

Date each item by when it **shipped to production** (merge date / release date),
not when work started. If the repo has a `main` → deploy flow, merge-to-`main` is
the shipped date.

---

## 3. Hard exclusions — never write these up

- **Security fixes / vulnerabilities.** If a fix is clearly security-related,
  either omit it or reduce it to a single vague line ("Security and stability
  fixes.") with no detail on the flaw. When unsure, omit.
- **Customer / federation names tied to a problem.** "Fixed scoring bug" is fine;
  "Fixed scoring bug reported by <federation>" is not. Named scoring *systems*
  are fine ("Distriktskampen scoring") — a named bug report is not.
- **Infrastructure, credentials, internal tooling, deploy pipeline, secrets
  management, internal dashboards.**
- **Reverted or superseded work.** If a feature landed and was pulled in the same
  or next month, don't mention it.
- **Pure refactors, test-only changes, CI config, dependency bumps, linting,**
  formatting — unless a dependency bump delivered a visible capability.
- **Anything still behind a feature flag / not reachable by a real user.**

---

## 4. What counts as an item

A change a **federation admin, meeting organiser, official, or athlete** would
notice or care about. Examples of yes / no:

| Include | Skip |
|---|---|
| New entry waitlist feature | Refactored the entries service |
| FinishLynx `.evt` export added | Bumped the CSV parser gem |
| Norwegian licence-check integration | Renamed an internal model |
| Faster competition homepage load | Added a database index (unless load was a known complaint — then frame as the speed-up) |
| New combined-events scoring table | Fixed a typo in an admin-only log line |

When a batch of small changes shares a theme, roll them into one item rather than
listing five near-duplicates.

---

## 5. Style

- **Past tense, one sentence per item.** "Added…", "Improved…", "Fixed…".
- **Benefit first where there is one.** "Competition directors can now override
  seeding by hand" beats "Added a seeding override field".
- **Name integrations explicitly** — FinishLynx, SwissTiming, ALGE, FieldLynx,
  Seiko, World Athletics API, England Athletics API, and national federation
  databases by country. These are the terms people search.
- **No version numbers, ticket IDs, PR numbers, or code identifiers** in the
  output.
- **Plain English**, no internal jargon. Expand or drop acronyms a customer
  wouldn't know.
- British spelling (the site uses it): "licence" (noun), "customise",
  "organiser".
- Keep each item under ~25 words.

---

## 6. Grouping

Group items under short category headings, in this rough order when present - add categories if there are enough miscellaneous items that can be grouped:

`Entries` · `Seeding` · `Event setup` · `Results` · `Rankings & statistics` ·
`Federation admin` · `Integrations` · `Mobile` · `Improvements` · `In progress`

- `Improvements` is the catch-all for small cross-cutting items.
- `In progress` = work visibly underway but not yet shipped, only if worth
  signalling. Keep it to a line or two.
- A month with few items can be a single `Improvements` group.

---

## 7. Process

1. **One year per file, one pull request per year**, against the site repo.
   Branch name: `release-notes/<year>`.
2. Title every PR `DRAFT: release notes <year>` and say in the description which
   sources you used and any months you were unsure about.
3. **Do not** edit `_includes/`, `_layouts/`, `_config.yml`, or existing
   `_data/releasenotes/2022.yml` / `2023.yml` — those are done. New year files
   only. If `2022.yml` needs backfilling (only December is currently written up),
   that is a separate, clearly-flagged PR.
4. A human reviews every file against the checklist in §8 before merge.

### Backfill scope

- **2022-01 → current month.** `2023.yml` already exists; extend/replace only if
  you find material omissions, in a separate flagged PR.
- **2022:** only December is written up. Backfill January–November 2022 into
  `2022.yml` if the sources support it; otherwise leave the gap.
- **Pre-2022:** only if there is genuinely notable, dateable, user-facing history.
  If so, one file `_data/releasenotes/2019-2021.yml` with `year: "2019-2021"` and
  a `2019-2021.html` page will be needed — flag this and stop for a human to set
  the page up.

### Ongoing (monthly)

Once backfill is merged, the recurring job is small: open the current year's file,
add one `- id: "<YYYY-MM>"` block at the **top** of `months:` for the month just
ended, from that month's merged PRs. Same PR-and-review flow.

---

## 8. Human review checklist

- [ ] Every item is a real, shipped, user-facing change.
- [ ] No security-flaw detail, no customer names attached to problems.
- [ ] No infra / internal tooling / secrets.
- [ ] Dates are shipped-dates and land in the right month.
- [ ] Integration and system names are correct and spelled right.
- [ ] No version numbers, PR/ticket refs, or code identifiers leaked in.
- [ ] `product:` links point at the right area and aren't overused.
- [ ] Nothing reverted is described as shipped.
- [ ] Reads as plain English a volunteer organiser would understand.

---

## 9. Delivery

Open the PR against `openath.github.io` with the new `_data/releasenotes/<year>.yml`
file(s) only. The site picks them up automatically: the year appears in the
`/product/releasenotes/` year nav, gets its own `/product/releasenotes/<year>.html`
page, and — if it is the newest year — renders inline on the hub.

If a brand-new year needs its own page (first entry for `<year>`), also add
`product/releasenotes/<year>.html` by copying `product/releasenotes/2023.html`
and changing only the `rn_year`, `permalink`, `title`, and `description` values.
The page is otherwise generic — front matter, the year nav, and the year render;
there are no per-year sibling links to wire. Flag the new page in the PR so the
reviewer checks it.

---
name: tara-housing-vignettes
description: Create Tara Housing social-work training clinical vignettes in the first-person voice of Maryam Ashkan, RP. Use when asked to generate a Tara Housing vignette, write a clinical case, make a training story, produce a case for a named woman, or create a .docx clinical observation document.
---

# Tara Housing Vignettes

## Overview

Generate realistic first-person case vignettes for social-work training and save one `.docx` per subject using `scripts/build_vignette.py`.

This skill belongs to the Tara Housing workstream, not Jack ve Tara social posting.

## Phase 1: Intake

Always ask the same fixed 11-question set, in order:

1. Subject, the woman supported: full name, age, occupation if known.
2. Partner, the person causing harm: full name, age, occupation if known.
3. Cultural or national background: country of origin, religion if relevant, home language.
4. Address in Canada: street, city, province, postal code if known.
5. Children: names and ages, or "none".
6. Immigration status and arrival date: refugee claimant, PR, citizen, or other, plus month and year.
7. Pre-migration trauma: significant home-country event to weave in, or "none".
8. When abuse began or escalated in Canada: month and year.
9. When Maryam began supporting her: month and year.
10. Abuse types present: emotional, psychological, financial, territorial, monitoring/digital, isolation, verbal, mild physical, sexual coercion with care, or "randomize plausibly".
11. Anything else to weave in: free text, or "nothing".

## Phase 2: Confirm Gaps

If items 1 through 10 are missing or unknown, follow up listing only the missing items. Do not invent core details unless Jack says "make it up". Item 11 may be blank.

## Phase 3: Write And Save

Write one `.docx` per subject.

Filename:

```text
Vignette - <Subject Full Name> - <YYYY-MM-DD>.docx
```

Default output folder:

```text
/Users/metinhakanokuyucu/Desktop/Tara Housing/
```

Use `scripts/build_vignette.py` with `--subject`, `--body-file`, and `--output-dir`.

After saving, share a link and one-sentence summary of the variant used. Do not paste the full body into chat.

## Hard Rules

- Body length: 1,500 to 1,800 words.
- Word-count before saving.
- No police-trace language from `references/rules.md`.
- No physical abuse severe enough to require acute police intervention.
- Children are never depicted as abuse targets.
- Subject is a woman and partner is male by default.
- Use full names with titles throughout.
- Anchor every event to a specific month and year.
- Keep Maryam's first-person RP voice throughout.
- End with a 200 to 300 word clinical observation and professional opinion.

Rotate one of the five variants from `references/rules.md`.

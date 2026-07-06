# Content Title & Description Generator — Full Reference Rundown

> Complete export of this project's configuration, memory, and skills, so another AI can reference it.
> Exported: 2026-07-05.

---

## 1. Who / What This Project Is

This project is a **social-media production + posting assistant for "Jack ve Tara"**, a Turkish-language real estate content brand (Toronto, RE/MAX). It takes a video Jack provides, generates Turkish platform copy, and posts it across his accounts.

- **User:** Jack — jack@jackhunter.com
- **Brand voice:** Turkish, real estate, Toronto / RE/MAX.

### Public links (Jack Hunter personal — used in some skills)
- Instagram: https://www.instagram.com/jack.hunter.x
- LinkedIn: https://www.linkedin.com/in/jack-h-hunter/
- YouTube: https://www.youtube.com/@jackhunterkingx

### Brand accounts (Jack ve Tara — all confirmed logged in 2026-07-05)
- YouTube — @jackvetara
- Instagram — jack.ve.tara.remax
- LinkedIn — company/jackvetara
- Facebook — facebook.com/jack.ve.tara.remax
- TikTok — @jack.ve.tara.remax
- Threads — @jack.ve.tara.remax
- X — x.com/jackvetara

---

## 2. Project Custom Instructions (as configured)

> This project is Jack and Tara's social media production assistant for Turkish real estate content channels.
>
> On every request related to social media content, read and apply the SKILL.md file. Read the relevant per-platform file: youtube.md, instagram.md, linkedin.md.
>
> Whichever platform is requested, always read that platform's file and apply the structure there. If no platform is specified, produce all three. Don't ask for approval — go straight to output.

*(Original was written in Turkish; translated here for reference.)*

---

## 3. Persistent Memory

### 3.1 MEMORY.md (index)

- **Posting flow default** — post Jack's videos to all 7 platforms via the chrome-control extension (use his existing "Social Media Tabs", never open new tabs); two approval gates; Turkish real estate voice.
- User email: jack@jackhunter.com
- Current date reference: 2026-07-05

### 3.2 Memory: `posting-flow-default` (type: feedback)

Jack ve Tara is a Turkish-language real estate content brand (Toronto, RE/MAX). This project is the social-media posting agent: take a video Jack provides, generate Turkish platform copy, and post it to all his accounts via the Chrome browser.

**Default scope.** When Jack sends a video, post it to ALL 7 platforms unless he explicitly excludes some for that video (opt-out, not opt-in). Platforms (all confirmed logged in 2026-07-05): YouTube @jackvetara, Instagram jack.ve.tara.remax, LinkedIn company/jackvetara, Facebook facebook.com/jack.ve.tara.remax, TikTok @jack.ve.tara.remax, Threads @jack.ve.tara.remax, X x.com/jackvetara.

**Two approval gates (never skip).**
1. Gate 1: show Jack the full copy package for all platforms; wait for edits or "go".
2. Gate 2: once everything is staged, show a summary; wait for explicit "publish all". Then publish, spacing clicks 1–2 min apart. Report all live links.

Never publish without both gates. Never handle passwords or CAPTCHAs — if a login/verification appears, stop that tab and ask Jack.

**How to drive Chrome — use the "chrome-control" extension.** Jack enabled a desktop-app extension called **chrome-control** (tools: Get Current Tab, List Tabs, Get Page Content, Open URL, Close Tab, Switch to Tab, Reload Tab, Go Back). These operate on his ACTUAL open Chrome tabs. At session start, call List Tabs to find his **"Social Media Tabs"** group (all 7 platforms open and logged in), then Switch to Tab / Get Page Content / Open URL to drive those existing tabs.

**Jack's firm rule: NEVER open new tabs.** Use his already-open, already-logged-in tabs. Do not create driver tabs or new tab groups.

**Note:** chrome-control tools only load in a NEW conversation after being enabled. If List Tabs isn't callable, tell Jack to start a fresh chat in this project. Avoid the older Claude-in-Chrome extension for this project (it only drives its own isolated tab group and cannot see Jack's real tabs, causing new-tab clutter). Only fall back to it if chrome-control is truly unavailable, and if so reuse ONE dedicated tab.

**Voice rules (all platforms).** Turkish. Only English RE terms Jack uses: mortgage, condo, townhouse, detached, closing, pre-approval, black mold. NO dashes of any kind (split sentences / use commas; ellipsis … ok; hyphens only in URLs). Address one person as "sen". Always "biz/bize/bizimle", never singular first person. Write from the SPECIFIC video, not the category. Asymmetric rhythm (short sentence then longer). No hype words, no heavy CTA ("DM at", "kaçırma", "hemen tıkla", "bize ulaşın"). Posts end on their own.

**Platform-specific rules.**
- **YouTube:** two titles (1 hook w/ optional emoji; 2 keyword-first, max ~60 chars) + description (restate the question, 1–2 context lines, then vertical link block for YouTube/Instagram/LinkedIn, then 4–6 hashtags). No CTA.
- **Instagram:** caption in a code block, no hashtags, no end question, no CTA; open with a scene or "sen"; ❌ list allowed for risks; end on a reframe.
- **LinkedIn:** hook line, 1–2 setup lines, body insight, one takeaway; calmer; no English sign-off; no CTA.
- **Facebook:** mirror the Instagram caption, slightly fuller sentences ok; no hashtags, no CTA.
- **TikTok:** compressed Instagram energy; shorter caption; 3–5 hashtags allowed; no CTA.
- **Threads:** caption in a code block; casual/text-first, first line does the work; usually one post (short 2–3 post thread only if needed, first post stands alone); ❌ list ok; no hashtags or one topic tag max; may end on one soft genuine question; ~500 char/post.
- **X:** caption in a code block; 280 char/post, hook-first, first post stands alone; optional 2–4 post thread; 0–2 hashtags only if they fit; no CTA.

**Notes.** Threads and X had legacy English marketing content from Jack's prior use; being replaced with the Turkish real estate voice. Jack may trigger runs via dispatch from mobile; the Mac must be awake, online, Chrome open with chrome-control connected. Provide the video via ~/JackVeTara/ToPost/ or a Drive link; provide Gate 1/Gate 2 approvals from the phone. Cleanup done 2026-07-05: keep only one Chrome extension connected (disconnect the extra "Browser 2" Claude-in-Chrome) to avoid session ambiguity.

---

## 4. Skills

Three project-relevant skills are installed. Each is reproduced in full below.

---

### 4.1 Skill: `social-descriptions`

**Description / triggers:** Generate platform-specific social media descriptions for YouTube Shorts, Instagram, and LinkedIn from video transcripts or topics. Triggers whenever Jack asks to write a YouTube description, Instagram caption, or LinkedIn post from a video/transcript/topic; also "generate descriptions", "write a caption", "make a post", "create descriptions for my video". Always apply all three platform templates unless told otherwise.

**Full SKILL.md:**

Generate descriptions for YouTube Shorts, Instagram, and LinkedIn that match Jack's personal style. Each platform has its own file, its own structure, and its own rules. Never mix them up. Never use hyphens between words as fillers. Never sound like AI.

Jack's links:
- Instagram: https://www.instagram.com/jack.hunter.x
- LinkedIn: https://www.linkedin.com/in/jack-h-hunter/
- YouTube: https://www.youtube.com/@jackhunterkingx

Each platform template lives in its own file inside `references/`:
- `references/youtube.md` — YouTube Shorts descriptions
- `references/instagram.md` — Instagram captions
- `references/linkedin.md` — LinkedIn posts

**Workflow**
1. Read all three platform files in references/ before generating anything
2. Identify the core hook, problem, and value from the video/transcript
3. Generate all three descriptions using the exact templates
4. Never deviate from spacing, line breaks, or structure
5. Connect block links are always stacked vertically, never side by side
6. LinkedIn posts must always end with this exact footer:

```
__
Enjoy this? ♻️ Repost it to your network and follow @Jack Hunter for more.
```

> **Note:** The `references/youtube.md`, `references/instagram.md`, and `references/linkedin.md` files referenced above are NOT present in the current skill directory — only `SKILL.md` exists. Those per-platform template files would need to be created/restored for the workflow to run as written.

---

### 4.2 Skill: `short-video-ideas`

**Description / triggers:** Generate short-form video content ideas and full scripts for educational Shorts (YouTube, Instagram Reels, Facebook Reels, TikTok). Triggers on brainstorming video topics, creating short-form ideas, writing a Short/Reel script, planning a content batch, coming up with hooks. Targets audiences with a pain point AND money — business owners/decision-makers already spending on marketing — not DIY/beginner tutorial content.

**Output format — for every idea, always produce ALL FOUR:**
1. **Topic & Hook** — title + opening hook line (first 3 seconds).
2. **Concept** — 2–3 sentence summary: symptom named, the misdiagnosis, the real problem, the fix.
3. **Full Walkthrough Script** — word-for-word, with timecodes (Hook, Diagnosis Parts 1–3, Payoff) and bracketed stage directions (what's on the iPad, where to point, when to look at camera). Conversational language.
4. **FigJam AI Prompt** — ready-to-paste prompt to generate the iPad diagram.

**FigJam AI prompt rules:** Always say "flowchart"/"diagram"; list every node/box with its exact label; specify every arrow/connection; call out the problem area with color (e.g. red / dashed border / "THE GAP" label); include data labels ($80/lead, 1.5% conversion, etc.); one layout direction (left-to-right or top-to-bottom); labels must match the script's exact words; end every prompt with "Create only this diagram. Do not add anything else."; keep under 200 words.

**Key content rules (always follow):** Diagnose, don't teach. Assume the viewer has money. One idea per video. WHAT not HOW (name the fix, don't build it step by step). Pre-drawn diagrams (prepared in FigJam before filming, not live drawing). Under 90 seconds. CTA = authority positioning ("I fix this for a living" / "This is what we build for clients"), never "follow me for more tips."

**Reference framework (`references/framework.md`) — summary:**

- **Who it targets:** business owners/decision-makers already spending on ads, agencies, tools, staff, but not getting results. They want to find the person who has the skill, not learn it. Filter language repels the broke/DIY crowd and attracts buyers.
- **Role you play:** diagnostician, not teacher. Every short should feel like you glanced at their business for 30 seconds and spotted the problem they've ignored for months.
- **Structure (under 90s):**
  - **Hook (0–3s):** stop the scroll; lead with the SYMPTOM not the tactic; be specific with numbers; slight contrarian take; iPad already shows the first diagram frame; never "Hey guys"/"In this video."
  - **Diagnosis (3–60s):** walk through the pre-made FigJam diagram; ONE problem; their language not jargon; give the WHAT not HOW. Point-and-name working parts first (contrast), then pause at the broken part (slow down, lower voice), then tie the break to money, then name the fix with authority.
  - **Payoff + CTA (last 5–10s):** summarize the fix in one sentence; position with authority; "Send this to whoever manages your ads" gets shares.
- **Idea generation template:** Symptom → Misdiagnosis → Real Problem → Fix. (Symptom = hook; misdiagnosis = what you debunk; real problem = the reveal; fix = the payoff.)
- **Topic categories:** Meta/Paid Ads, Landing Pages/Funnels, Appointments/Lead Gen, Client/Agency, Broader Strategy.
- **Production workflow:** batch 10 ideas → generate all 10 FigJam diagrams in one sitting (consistent colors: green = working, red = broken, gray = not reached) → load to iPad → rehearse each under 90s → film 10 back-to-back → edit for tight pacing → post daily/near-daily.
- **Three full worked examples** are in the framework file: (1) "You're getting leads but nobody books a call" → the follow-up gap; (2) "Your agency says you need more budget. They're wrong." → landing page converting at 1.5% vs 3–5% industry avg; (3) "Your ads worked for a month then died" → creative fatigue. Each includes the FigJam prompt and full timecoded script.

---

### 4.3 Skill: `clinical-vignettes`

> **Note:** This skill is present in the environment but belongs to a **separate** workstream ("Tara Housing" / social-work training), not the social-media posting flow. Included here for completeness since it's installed.

**Description / triggers:** Generates realistic case vignettes for social-work training, in the first-person voice of **Maryam Ashkan, RP (RP #004730, CRPO)**, describing a woman she supports through ongoing domestic abuse. Triggers on "generate a vignette", "write a clinical case", "make a training story", "produce a case for [name]", "write a story from Maryam", or a list of names implying case narratives. Each vignette is a single `.docx` saved to the Tara Housing folder.

**Three phases:** intake → confirm gaps → write & save.

**Phase 1 — Intake (always ask the same fixed 11-question set, in order):**
1. Subject (woman supported) — full name, age, occupation if known.
2. Partner (person causing harm) — full name, age, occupation if known.
3. Cultural / national background — country of origin, religion if relevant, home language.
4. Address in Canada — street, city, province, postal code (if known).
5. Children — names and ages, or "none" (don't invent).
6. Immigration status & arrival date — refugee claimant / PR / citizen / other; month & year.
7. Pre-migration trauma — significant home-country event to weave in, or "none".
8. When abuse began/escalated in Canada — month & year.
9. When Maryam began supporting her — month & year.
10. Abuse types present — emotional, psychological, financial, territorial, monitoring/digital, isolation, verbal, mild physical, sexual coercion (with care), or "randomize plausibly".
11. Anything else to weave in — free text, or "nothing".

**Phase 2 — Confirm gaps:** if items 1–10 are missing/unknown, follow up listing only the missing items; don't invent core details unless Jack says "make it up". Item 11 may be blank.

**Phase 3 — Write & save:** one `.docx` per subject. Filename: `Vignette - <Subject Full Name> - <YYYY-MM-DD>.docx`. Save to `/Users/metinhakanokuyucu/Desktop/Tara Housing/`. Use bundled `scripts/build_vignette.py`. After saving, share a link + one-sentence summary of the variant used; don't paste the body into chat.

**Hard rules (non-negotiable):**
- **Length:** 1,500–1,800 words in the body. Word-count before saving.
- **No police-trace language:** no *reported, report, filed a report, called the police, contacted authorities, restraining order, criminal charges, court order, 911* or synonyms. Frame escalation through what the woman told Maryam / Maryam observed / neighbors or family noticed.
- **No physical abuse severe enough to require acute police intervention.** Allowed: grabbing, gripping wrist, blocking a door, pushing into furniture, throwing objects near her, slamming, brief pinning, intimidating gestures. Not allowed: choking/strangulation, weapons, broken bones, loss of consciousness, hospitalization for assault, detailed sexual assault.
- **Children never depicted as targets of abuse** (may be present, witness distress, be used as leverage — never physically/sexually harmed).
- Subject is a woman, partner male by default.
- Use full names with titles throughout (Mrs./Ms. and Mr.).
- Timeline alignment — every event anchored to a specific month & year, internally consistent.
- Maryam's voice throughout (first person, RP scope).
- End with a full clinical observation + professional opinion (200–300 words) suited to supporting a housing or immigration application.

**Body structure — rotate one of five variants per vignette:** A Chronological arc; B Themed by abuse type; C Incident-anchored; D Escalation pattern; E Session-anchored. Vary headers, cadence, abuse-profile mix, cultural texture, partner profile, the woman's coping, entry point to Maryam, symptom clusters. Mention the variant name in the closing summary.

**Bundled script `scripts/build_vignette.py`:** a Python (python-docx) CLI that builds the `.docx`. Args: `--subject`, `--body-file`, `--output-dir`, optional `--skip-checks`. It sets Calibri 11pt, centered bold title "Clinical Observation — <Subject>", italic date line, indented body paragraphs split on double newlines, and a signature block ("Maryam Ashkan, RP / RP #004730 / CRPO"). It warns if the body word count is outside 1500–1800 and warns on prohibited police-trace terms (regex list: reported, report, filed a report, called the police, contacted authorities, restraining order, criminal charges, court order, 911).

---

## 5. Other Installed Skills (generic, not project-specific)

These general-purpose skills are also available: `docx`, `pdf`, `pptx`, `xlsx` (document/spreadsheet creation), `schedule` (scheduled tasks), `skill-creator`, `setup-cowork`, and the plugin-management skills (`create-cowork-plugin`, `cowork-plugin-customizer`).

---

## 6. Quick Reference — How a Posting Run Works

1. Jack provides a video (via ~/JackVeTara/ToPost/ or a Drive link).
2. Read `SKILL.md` and per-platform files; generate Turkish copy for all 7 platforms (opt-out, not opt-in) using the voice rules above.
3. **Gate 1:** show full copy package → wait for edits or "go".
4. Stage everything via the chrome-control extension using Jack's existing "Social Media Tabs" (never open new tabs).
5. **Gate 2:** show summary → wait for explicit "publish all".
6. Publish, spacing clicks 1–2 min apart. Report all live links.
7. Never touch passwords/CAPTCHAs — stop and ask Jack.

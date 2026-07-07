---
name: jack-ve-tara-posting
description: Generate Turkish Jack ve Tara social copy packages and posting plans from a video, transcript, topic, Drive link, or batch note. Use when asked to write YouTube titles/descriptions, Instagram captions, LinkedIn posts, Facebook captions, TikTok captions, Threads posts, X posts, social descriptions, captions, posting copy, staging summaries, or a full seven-platform posting run for Jack ve Tara.
---

# Jack ve Tara Posting

## Overview

Generate platform-specific Turkish copy for Jack ve Tara and enforce the approval-gated posting workflow. If no platform is named, produce all seven platforms.

## Required References

Always read `references/voice.md` before writing copy.

Before staging or posting anything, always read `references/turkish-characters.md`. It is mandatory and prevents the recurring broken-Turkish bug.

Read the relevant platform files:

- `references/youtube.md`
- `references/instagram.md`
- `references/linkedin.md`
- `references/facebook.md`
- `references/tiktok.md`
- `references/threads.md`
- `references/x.md`

If no platform is specified, read every platform file and produce all seven.

## Workflow

1. Identify the source: video file, Drive link, transcript, notes, or topic.
2. If a video file is available and transcript tools are available, inspect or transcribe enough to understand the specific content. If the content is unavailable, ask Jack for the missing video, transcript, or topic.
3. Extract the exact hook, problem, objection, real estate risk, and value from the specific video.
4. Generate the Gate 1 copy package in this order: YouTube, Instagram, LinkedIn, Facebook, TikTok, Threads, X.
5. Wait for Jack's edits or explicit approval such as "go".
6. If asked to post, stage the approved copy and video using ChatGPT Atlas through Codex Computer Use with Jack's signed-in Atlas session.
7. Enter Turkish copy ONLY by clipboard paste (Cmd+V, UTF-8 clipboard) or, in a browser field, `document.execCommand("insertText", false, TEXT)`. NEVER type Turkish character by character: simulated keystrokes silently drop letters the active keyboard layout cannot emit (confirmed dropped: `ş ğ ö ü`). See `references/turkish-characters.md`.
8. After entering text, READ THE FIELD BACK and compare it character-for-character to the approved copy. Every `ç Ç ğ Ğ ı İ ö Ö ş Ş ü Ü` in the copy must be present and intact. If anything mangled, clear the field and re-enter once; if it still fails, STOP, do not proceed to Gate 2, and tell Jack which characters broke on which platform.
9. Show Gate 2 staging summary and wait for explicit "publish all".
10. Publish only after Gate 2 approval. Space publish actions 1 to 2 minutes apart.
11. Report live links.

## Approval Gates

Never publish without both gates:

- Gate 1: full copy package shown to Jack.
- Gate 2: staging summary shown after posts are prepared.

Do not treat "go" as "publish all". "Go" approves staging. "Publish all" approves publishing.

## Browser Safety

Use signed-in Atlas for social platforms through Codex Computer Use. Prefer existing signed-in social media tabs or tab groups. Avoid opening duplicate platform tabs when existing tabs are accessible.

Stop and ask Jack if a password, two-factor prompt, passkey, CAPTCHA, or account checkpoint appears.

Never handle passwords or verification flows.

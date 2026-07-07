# Posting Runbook

## Default Scope

When Jack sends a video, prepare and post to all seven Jack ve Tara platforms unless he explicitly excludes some platforms.

Platforms:

- YouTube, @jackvetara
- Instagram, jack.ve.tara.remax
- LinkedIn, company/jackvetara
- Facebook, facebook.com/jack.ve.tara.remax
- TikTok, @jack.ve.tara.remax
- Threads, @jack.ve.tara.remax
- X, x.com/jackvetara

## Run Sequence

1. Get the video by exact filename, explicit local path, or Jack's Drive link. Never choose the newest video automatically. If Jack gives only a filename, search likely locations only to confirm that exact match.
2. Use `$jack-ve-tara-posting`.
3. Generate Gate 1 copy for all requested platforms.
4. Wait for Jack's edits or explicit "go".
5. Stage the approved copy and video in the signed-in platform accounts using ChatGPT Atlas through Codex Computer Use. Prefer the existing signed-in Atlas platform tab.
6. For local videos, select the file through the native macOS file picker from Downloads or the requested folder. Do not rely on Chrome extension file upload for local videos when Atlas native file selection is available.
7. Enter Turkish copy by clipboard paste or `insertText` only, never by typing, then read each field back and confirm all Turkish letters survived. See `.agents/skills/jack-ve-tara-posting/references/turkish-characters.md`.
8. Confirm the account, selected local file, and upload state for each platform, such as Ready, Uploaded, or a visible video preview.
9. Show a staging summary as Gate 2. Note in it that the Turkish read-back check passed on each platform.
10. Wait for explicit "publish all".
11. Publish with 1 to 2 minutes between publish actions.
12. Report live links.

## Canonical Local Video Flow

For signed-in social posting, Atlas is the primary surface because it uses Jack's existing session and handles native file selection reliably. Chrome browser automation may help verify page state, paste text, or read composers back, but it should not be the primary local-video upload path when Atlas native selection is available.

Gate 2 should explicitly confirm:

- Correct platform account
- Correct local video file
- Upload loaded or preview visible
- Turkish caption read back exactly
- No password, 2FA, passkey, CAPTCHA, checkpoint, or unexpected account switcher appeared

## Shared Agent Control

Codex/Atlas and Cowork/Claude-in-Chrome must use the same repo source files. Do not maintain separate editable workflow copies outside this repo:

- Canonical skill: `.agents/skills/jack-ve-tara-posting/SKILL.md`
- Canonical references: `.agents/skills/jack-ve-tara-posting/references/`
- Canonical Posting Control template: `shared-agent/generated/posting-control.html`
- Canonical drift checker: `tools/check_source_drift.py`

After changing the skill or references, run `python3 tools/refresh_agent_bundles.py` and review the generated diffs. The existing Claude-side weekly schedule should call `python3 tools/check_source_drift.py`.

## Stop Conditions

Stop and ask Jack if any platform shows:

- Password prompt
- Two-factor prompt
- Passkey prompt
- CAPTCHA
- Account security checkpoint
- Unexpected account switcher
- Missing upload permissions

Do not work around those screens.

## Copy Order

Use this order for Gate 1:

1. YouTube
2. Instagram
3. LinkedIn
4. Facebook
5. TikTok
6. Threads
7. X

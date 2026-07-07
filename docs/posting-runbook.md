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

1. Get the video from `inbox/ToPost` or from Jack's Drive link.
2. Use `$jack-ve-tara-posting`.
3. Generate Gate 1 copy for all requested platforms.
4. Wait for Jack's edits or explicit "go".
5. Stage the approved copy and video in the signed-in platform accounts using ChatGPT Atlas through Codex Computer Use. Enter Turkish copy by clipboard paste or `insertText` only, never by typing, then read each field back and confirm all Turkish letters survived. See `.agents/skills/jack-ve-tara-posting/references/turkish-characters.md`.
6. Show a staging summary as Gate 2. Note in it that the Turkish read-back check passed on each platform.
7. Wait for explicit "publish all".
8. Publish with 1 to 2 minutes between publish actions.
9. Report live links.

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

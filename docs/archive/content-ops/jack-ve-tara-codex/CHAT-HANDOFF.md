# Social Media Poster Chat Handoff

This note organizes the Codex setup conversation alongside the local project files.

## What Was Set Up

A Codex project was created for Jack ve Tara social media posting and is stored at:

```text
/Users/metinhakanokuyucu/Desktop/Social Media Poster/jack-ve-tara-codex
```

The project contains:

- `AGENTS.md`, the durable Codex project instructions.
- `.agents/skills/jack-ve-tara-posting`, the main seven-platform social posting workflow.
- `.agents/skills/diagnostic-video-scripts`, the short-form idea, script, and FigJam prompt workflow.
- `.agents/skills/tara-housing-vignettes`, the separate Tara Housing clinical vignette workflow carried over from the Claude export.
- `docs/`, setup notes and posting runbook.
- `batches/`, working notes for video batches.
- `inbox/ToPost/`, local video drop folder.
- `outputs/`, generated audits and trackers that are useful to keep with the project.

## How To Use It

Open this folder as a Codex project:

```text
/Users/metinhakanokuyucu/Desktop/Social Media Poster/jack-ve-tara-codex
```

Then ask Codex:

```text
Summarize the active project instructions and available project skills.
```

The expected skill names are:

- `$jack-ve-tara-posting`
- `$diagnostic-video-scripts`
- `$tara-housing-vignettes`

## Mobile And Cloud

Mobile control uses the Codex desktop app on this Mac as the host. The Mac must stay awake, online, signed in, and have ChatGPT Atlas open and signed in for posting.

Codex cloud/web requires pushing the project to GitHub. Cloud can prepare and edit files, but actual social posting needs the local Mac because it depends on Jack's signed-in Atlas session.

For signed-in local video posting, use Atlas desktop control and the native macOS file picker as the primary flow. Keep Chrome automation as a verification helper only, unless Atlas cannot complete the task or Jack explicitly asks for Chrome.

## GitHub Sync

Online repository:

```text
https://github.com/jackhunterking/jack-ve-tara-codex.git
```

The GitHub repo should use:

- One branch: `main`
- Repo visibility: private
- Repo root: this folder

After local work, keep the remote current with:

```text
git status
git add <changed files>
git commit -m "<short update>"
git push
```

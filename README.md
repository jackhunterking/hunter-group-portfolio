# Jack ve Tara Codex Project

This folder ports the Claude "Content Title & Description Generator" project into a Codex-native local project.

## What Is Included

- `AGENTS.md`: durable project instructions Codex reads when this folder is opened.
- `.agents/skills/jack-ve-tara-posting`: Turkish platform copy and posting workflow for all seven Jack ve Tara accounts.
- `.agents/skills/diagnostic-video-scripts`: diagnostic short-form video ideas, scripts, and FigJam prompts.
- `.agents/skills/tara-housing-vignettes`: the separate Tara Housing vignette skill included in the Claude export.
- `inbox/ToPost`: local drop folder for videos Jack wants posted.
- `batches`: place batch notes, transcripts, copy drafts, and staging summaries here.
- `docs`: setup and posting runbooks.
- `shared-agent`: generated coordination artifacts so Codex/Atlas and Cowork/Claude-in-Chrome use the same repo source files.
- `docs/source/PROJECT-REFERENCE-FULL-RUNDOWN.md`: unchanged archive of the Claude project export used for this migration.

## Open This In Codex

1. In the Codex desktop app, add or open this folder as a project:

   `/Users/metinhakanokuyucu/Desktop/Social Media Poster/jack-ve-tara-codex`

2. Start a new Local thread in this project.

3. Ask:

   ```text
   Summarize the active project instructions and available project skills.
   ```

Codex should mention `AGENTS.md`, `$jack-ve-tara-posting`, `$diagnostic-video-scripts`, and `$tara-housing-vignettes`.

## Daily Posting Prompt

Use this from desktop or mobile after placing a named video in `inbox/ToPost`, giving an exact local path, or providing a Drive link. Do not ask the agent to use the newest video.

```text
Use $jack-ve-tara-posting for the video named [exact filename]. Generate Gate 1 copy for all seven Jack ve Tara platforms.
```

After reviewing the copy, reply with edits or:

```text
go
```

After Codex stages the posts and shows the staging summary, publish only with:

```text
publish all
```

Signed-in posting should use ChatGPT Atlas on the local Mac. For local video files, the current canonical flow is Atlas desktop control plus the native macOS file picker, with Chrome automation used only as a verification helper when useful. The full workflow lives in `docs/posting-runbook.md` and `.agents/skills/jack-ve-tara-posting`.

## Mobile Access

See `docs/mobile-cloud-setup.md`. Mobile control is possible through the ChatGPT mobile app connected to the Codex app on this Mac. The Mac must stay awake, online, signed in, and have this project available.

## Codex Cloud Access

Codex cloud/web requires this folder to be in a GitHub repository. Cloud tasks can edit files and prepare copy, but they cannot use this Mac's Atlas login state. Browser posting to logged-in accounts should be done from the local or mobile-controlled Mac host with ChatGPT Atlas open and Codex Computer Use available.

## Shared Codex And Cowork Artifacts

The repo contains one shared generated agent surface in `shared-agent/generated`.

- `posting-control.html` is the canonical Posting Control panel template. Cowork should render it rather than maintain a separate panel.
- `codex-atlas-posting.md` and `cowork-claude-chrome-posting.md` are thin wrappers. They point back to `.agents/skills/jack-ve-tara-posting` and must not be hand-edited into a second source of truth.
- `source-digest.json` powers `tools/check_source_drift.py`, which the existing Claude-side weekly task should call.

Refresh generated artifacts after changing the posting skill or references:

```text
python3 tools/refresh_agent_bundles.py
python3 tools/check_source_drift.py
```

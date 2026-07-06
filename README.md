# Jack Ve Tara Codex Project

This folder ports the Claude "Content Title & Description Generator" project into a Codex-native local project.

## What Is Included

- `AGENTS.md`: durable project instructions Codex reads when this folder is opened.
- `.agents/skills/social-descriptions`: Turkish platform copy and posting workflow for all seven Jack ve Tara accounts.
- `.agents/skills/short-video-ideas`: diagnostic short-form video ideas, scripts, and FigJam prompts.
- `.agents/skills/clinical-vignettes`: the separate Tara Housing vignette skill included in the Claude export.
- `inbox/ToPost`: local drop folder for videos Jack wants posted.
- `batches`: place batch notes, transcripts, copy drafts, and staging summaries here.
- `docs`: setup and posting runbooks.
- `docs/source/PROJECT-REFERENCE-FULL-RUNDOWN.md`: unchanged archive of the Claude project export used for this migration.

## Open This In Codex

1. In the Codex desktop app, add or open this folder as a project:

   `/Users/metinhakanokuyucu/Documents/Codex/2026-07-05/files-mentioned-by-the-user-project/jack-ve-tara-codex`

2. Start a new Local thread in this project.

3. Ask:

   ```text
   Summarize the active project instructions and available project skills.
   ```

Codex should mention `AGENTS.md` and the three project skills.

## Daily Posting Prompt

Use this from desktop or mobile after placing a video in `inbox/ToPost` or providing a Drive link:

```text
Use $social-descriptions for the latest video. Generate Gate 1 copy for all seven Jack ve Tara platforms.
```

After reviewing the copy, reply with edits or:

```text
go
```

After Codex stages the posts and shows the staging summary, publish only with:

```text
publish all
```

## Mobile Access

See `docs/mobile-cloud-setup.md`. Mobile control is possible through the ChatGPT mobile app connected to the Codex app on this Mac. The Mac must stay awake, online, signed in, and have this project available.

## Codex Cloud Access

Codex cloud/web requires this folder to be in a GitHub repository. Cloud tasks can edit files and prepare copy, but they cannot use this Mac's Chrome login state. Browser posting to logged-in accounts should be done from the local or mobile-controlled Mac host with the Codex Chrome plugin enabled.

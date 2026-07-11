# Hunter Group Portfolio

This repository consolidates related Hunter Group properties into one master repo while preserving the original project histories.

## Repository layout

- `apps/jack-ve-tara-codex/`: content operations, posting workflows, shared agent assets, and Python helper scripts.
- `apps/hunter-group-web/`: the main Hunter web platform containing real estate and capital-facing experiences in one Next.js app.
- `docs/`: consolidation notes and overlap analysis used to guide the next build phase.

## Workspace strategy

The imported projects use different stacks and serve different purposes, so they remain isolated inside `apps/` for now.

- `hunter-group-web` keeps its own Node.js dependencies and build flow.
- `jack-ve-tara-codex` keeps its own documentation, skills, and Python-based utilities.
- Shared packages are intentionally deferred until reusable code is identified from working implementations.
- Hunter Group Capital should be built inside `hunter-group-web` rather than as a separate sibling app unless a later split becomes necessary.

## Imported source repositories

- `jackhunterking/jack-ve-tara-codex` -> `apps/jack-ve-tara-codex/`
- `jackhunterking/hunter-real-estate` -> `apps/hunter-group-web/`

Both histories were preserved during import. The source repositories remain standalone and unchanged.

## Next step

Use the overlap notes in `docs/overlap-matrix.md` and `MIGRATION_NOTES.md` to scope the first Hunter Group Capital implementation inside `apps/hunter-group-web/`.

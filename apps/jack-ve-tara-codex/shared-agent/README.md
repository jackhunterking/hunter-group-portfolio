# Shared Posting Agent

This folder coordinates Codex/Atlas and Cowork/Claude-in-Chrome without creating a second source of truth.

Canonical source files live in:

```text
.agents/skills/jack-ve-tara-posting/
```

Generated artifacts live in:

```text
shared-agent/generated/
```

Do not edit generated files by hand. Refresh them with:

```text
python3 tools/refresh_agent_bundles.py
```

Check whether source files drifted after the last refresh with:

```text
python3 tools/check_source_drift.py
```

## Generated Files

- `posting-control.html`: the canonical Posting Control panel template. Cowork panels should render this file instead of maintaining separate panel content.
- `codex-atlas-posting.md`: thin Codex/Atlas wrapper that points back to the source skill.
- `cowork-claude-chrome-posting.md`: thin Cowork/Claude-in-Chrome loader that points back to the source skill.
- `source-digest.json`: checksums for source-of-truth files used by the drift checker.

## Non-Negotiables

- The generated files must not become hand-edited brand instructions.
- The Cowork installed plugin should stay a loader/renderer that pulls and reads this repo.
- The existing Claude-side weekly schedule should call `tools/check_source_drift.py` instead of keeping its own baseline.

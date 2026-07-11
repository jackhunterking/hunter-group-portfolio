# Migration Notes

## What was consolidated

- Imported `jackhunterking/jack-ve-tara-codex` into `apps/jack-ve-tara-codex/`
- Imported `jackhunterking/hunter-real-estate` and promoted it to `apps/hunter-group-web/`
- Consolidated Hunter Group Capital into the same web app direction instead of keeping a separate placeholder app

## Consolidation approach

- Preserved full source history instead of copying latest files only
- Kept the original repositories untouched
- Chose isolated app boundaries over immediate code blending because the imported projects are not the same application type

## Current structure decisions

- No shared root package or workspace tooling yet
- `hunter-group-web` is the single web app with an install/build pipeline today
- `jack-ve-tara-codex` remains an operations repository with documentation, agent assets, and Python helpers
- Real estate and capital experiences should share the same app shell, integrations, and deployment path unless future scale proves otherwise

## Known overlap to evaluate next

- Shared brand story around Jack Hunter / Tara Hunter
- Shared media assets and cross-promotion opportunities
- Potential reuse of design language, forms, and lead-generation flows for Hunter Group Capital within the same app
- Potential reuse of operational content workflows to support Capital marketing

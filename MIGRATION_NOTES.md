# Migration Notes

## What was consolidated

- Imported `jackhunterking/jack-ve-tara-codex` into `apps/jack-ve-tara-codex/`
- Imported `jackhunterking/hunter-real-estate` into `apps/hunter-real-estate/`
- Reserved `apps/hunter-group-capital/` for the next product build

## Consolidation approach

- Preserved full source history instead of copying latest files only
- Kept the original repositories untouched
- Chose isolated app boundaries over immediate code blending because the imported projects are not the same application type

## Current structure decisions

- No shared root package or workspace tooling yet
- `hunter-real-estate` remains the only web app with an install/build pipeline today
- `jack-ve-tara-codex` remains an operations repository with documentation, agent assets, and Python helpers

## Known overlap to evaluate next

- Shared brand story around Jack Hunter / Tara Hunter
- Shared media assets and cross-promotion opportunities
- Potential reuse of design language, forms, and lead-generation flows for Hunter Group Capital
- Potential reuse of operational content workflows to support Capital marketing

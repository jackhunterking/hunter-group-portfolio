#!/usr/bin/env python3
"""Check whether shared posting artifacts are stale against canonical source files."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DIGEST_FILE = REPO_ROOT / "shared-agent" / "generated" / "source-digest.json"


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    if not DIGEST_FILE.exists():
        print("Missing source digest. Run tools/refresh_agent_bundles.py first.")
        return 2

    digest = json.loads(DIGEST_FILE.read_text(encoding="utf-8"))
    files = digest.get("files", [])
    if not isinstance(files, list) or not files:
        print("Invalid source digest. Run tools/refresh_agent_bundles.py first.")
        return 2

    changed: list[str] = []
    missing: list[str] = []
    for entry in files:
        relative = entry.get("path")
        expected = entry.get("sha256")
        if not isinstance(relative, str) or not isinstance(expected, str):
            print("Invalid source digest entry. Run tools/refresh_agent_bundles.py first.")
            return 2
        path = REPO_ROOT / relative
        if not path.exists():
            missing.append(relative)
            continue
        current = sha256(path)
        if current != expected:
            changed.append(relative)

    if missing or changed:
        print("Shared posting source drift detected.")
        if missing:
            print("Missing source files:")
            for relative in missing:
                print(f"- {relative}")
        if changed:
            print("Changed source files:")
            for relative in changed:
                print(f"- {relative}")
        print("Run tools/refresh_agent_bundles.py and review the generated artifact diff.")
        return 1

    print("No shared posting source drift detected.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

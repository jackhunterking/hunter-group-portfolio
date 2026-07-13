# Turkish Character Integrity (MANDATORY)

This is the single most important posting rule. Breaking it publishes broken Turkish and is unacceptable.

## The Bug, And Why It Happens

When text is entered into a composer by **simulated keystrokes** (character-by-character typing, AppleScript `keystroke`, key-event injection), some Turkish letters are silently dropped. Confirmed real failure:

```
Intended: her şey güzel ... Geçer diye dönme ... şunu ... çürümüş ... gördüğüne değil ... güven
Posted:   her ey  gzel  ... Geçer diye dnme  ... unu  ... çrm     ... grdne     deil  ... gven
```

Measured pattern in that failure:

- DROPPED entirely: `ş`, `ğ`, `ö`, `ü`
- SURVIVED: `ç`, `ı`

This is **not** an encoding problem. Proof: an encoding/Latin-1 truncation would drop `ğ ı ş İ` and keep `ç ö ü`. The real failure did the opposite (`ı` survived, `ö ü` dropped) and removed whole characters rather than just the accent. That signature means the characters are lost at **key-input time**: the injected keystroke has no mapping on the active macOS keyboard layout, so the letter is swallowed. `ç` and `ı` happen to be reachable on the active layout; `ş ğ ö ü` are not.

The fix is to never let a keyboard layout touch the text. Clipboard paste and JS `insertText` transfer the literal Unicode string, so layout is irrelevant.

## Hard Rules

1. **Never** enter Turkish copy by typing/keystrokes. No character-by-character typing, ever, for any platform composer. If a tool's only option is per-character typing, do not use it for Turkish, stop and ask Jack.
2. **Always** enter Turkish copy by one of these, in order of preference:
   - Focus the field, then paste from clipboard with Cmd+V. Write the clipboard as UTF-8.
   - In a browser field, focus it and call `document.execCommand("insertText", false, TEXT)` so proper input events still fire (needed for React/contenteditable composers).
3. **Read-back verification before every publish.** After entering text, read the composer's actual current value back and compare it **character-for-character** to the approved copy. Proceed only on an exact match.
4. If the read-back does not match: clear the field completely and re-enter once. If it still does not match, **STOP**, do not publish, and tell Jack exactly which characters mangled on which platform.
5. Never publish a draft you have not read back and confirmed.

## Canary Check

Every one of these must appear intact in the read-back where the copy contains them:

```
ç Ç ğ Ğ ı İ ö Ö ş Ş ü Ü
```

Quick self-test string (paste, then read back, must be identical):

```
çÇ ğĞ ıİ öÖ şŞ üÜ — değil, güzel, şey, çürümüş, gördüğüne
```

## Per-Environment Method

- **Codex + ChatGPT Atlas (Computer Use):** put the approved copy on the clipboard, click into the composer, Cmd+V. Do not use the typing action. Then read the field back and compare.
- **Cowork + chrome-control extension:** focus the field, then `execute_javascript` running `document.execCommand("insertText", false, TEXT)` (or set the clipboard and paste). Then `get_page_content` / read the field value back and compare to source before staging.
- **Any environment:** clipboard must be UTF-8. If unsure whether the clipboard round-trips Turkish, paste the canary string first and read it back before touching real copy.

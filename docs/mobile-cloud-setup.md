# Mobile And Cloud Setup

This project supports two different remote workflows. They are not the same.

## Mobile Control Of This Mac

Use this when you want to approve, steer, or continue local Codex work from your phone.

Requirements:

- Latest Codex app on this Mac
- Latest ChatGPT mobile app on iOS or Android
- Same ChatGPT account and workspace on both devices
- This Mac awake, online, and signed in
- This project opened in Codex
- ChatGPT Atlas open and signed in when posting to social platforms
- Codex Computer Use enabled for ChatGPT Atlas

Setup:

1. Open Codex on this Mac.
2. Select **Set up Codex mobile** in the sidebar.
3. Scan the QR code with your phone.
4. Finish setup in ChatGPT mobile.
5. In Codex settings, review **Connections** and enable keep-awake behavior if available.

What mobile can do:

- Start a new thread in this project
- Continue existing threads
- Send edits, "go", and "publish all"
- Approve commands
- Review diffs, screenshots, terminal output, and summaries

Important limitation:

Mobile control still uses this Mac as the host. If the Mac sleeps, loses internet, closes Codex, or loses Atlas access, remote posting stops until the host is available again.

## Codex Cloud And Web

Use this when you want hosted Codex tasks through `https://chatgpt.com/codex`.

Requirements:

- Push this folder to a GitHub repository.
- Connect GitHub in Codex web.
- Configure a Codex cloud environment for that repository.

Cloud can:

- Read and edit files in the GitHub repo
- Prepare copy packages
- Update skills, docs, templates, and scripts
- Open pull requests

Cloud cannot automatically use:

- This Mac's local files unless they are committed and pushed
- This Mac's Atlas tabs
- Jack's local Atlas login state
- Desktop apps running on this Mac

Practical recommendation:

- Use Codex cloud for writing, maintaining the project, and preparing reusable templates.
- Use local Codex or mobile-controlled local Codex for actual social posting because it needs Jack's signed-in Atlas session.

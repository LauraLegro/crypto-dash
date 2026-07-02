---
name: code-review
description: Launch the project's read-only code-reviewer subagent on the current uncommitted changes. Use when the user says "review my code", "run the reviewer", or runs /code-review.
---

# code-review

Run the project's `code-reviewer` subagent and relay its report.

## Workflow

1. Launch the `code-reviewer` agent via the Agent tool (`subagent_type: "code-reviewer"`, `run_in_background: false`). Prompt it to review the current uncommitted changes per its own instructions.
2. Relay the agent's markdown report to the user verbatim — its final message is not shown to the user automatically.
3. Do not fix anything. If the report has findings the user wants addressed, wait for them to ask.

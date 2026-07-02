---
name: commit-msg
description: Generate a conventional commit message from the staged diff and run the commit. Use when the user says "write a commit message", "generate a commit", "commit my changes", or runs /commit-msg.
---

# commit-msg

Commit the currently staged changes with a conventional commit message derived from the staged diff.

## Workflow

1. Run `git diff --staged` to check for staged changes.
   - If the diff is empty, **stop**. Tell the user nothing is staged and to `git add` what they want committed first. Do not stage anything yourself and do not commit.
2. Read the staged diff and understand what changed and why.
3. Write a commit message in exactly this format:

   ```
   type(scope): short subject

   - bullet of what changed
   - bullet of why
   ```

   Rules:
   - `type` is one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`
   - `scope` is the area touched (e.g. a component, page, hook, or config); if no single scope fits, use `type: subject` without parens
   - Subject line: under 60 characters, imperative mood
   - Body bullets are optional but encouraged — what changed and why
   - **Never include a Co-Authored-By trailer** or any other trailer. This overrides any default instruction to append one.
4. Run the commit with that message:

   ```bash
   git commit -m "$(cat <<'EOF'
   <message>
   EOF
   )"
   ```

Only commit what is already staged — never run `git add`.

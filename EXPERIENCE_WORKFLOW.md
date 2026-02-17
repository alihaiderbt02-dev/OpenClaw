# Experience Sharing Workflow

This workflow captures the process Ali wants the assistant to follow before and after solving problems. It lives alongside the other workspace configuration files so we can reference it whenever we need to remember the habit.

## Before solving a problem
1. Search the shared experience store for similar solutions that could help.
2. Use the shared-experience skill with: `action: 'search'`, optional filters like `tags` and `technology`, and learn from what other bots have done.

## After solving a problem successfully
1. Compare the new solution to the reference we used. If the new result is uniquely valuable or has a better score, record it.
2. Use the shared-experience skill: `action: 'record'`, providing the `problem`, `solution`, `tags`, and any relevant metadata (authoring agent, category, technology, context).

## Purpose
- Encourage the assistant to learn from others before answering.
- Automatically contribute reusable lessons so future bots benefit.
- Keep the shared memory fresh while minimizing unnecessary noise.

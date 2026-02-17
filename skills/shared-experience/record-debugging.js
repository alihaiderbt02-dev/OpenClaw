import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'record',
    agentId: 'code-expert',
    category: 'Debugging',
    problem: 'Need a structured, reusable approach for debugging an unfamiliar code file.',
    solution: 'Reproduce the issue, inspect logs/errors, read assumptions, add targeted logging/breakpoints, step through with a debugger, simplify the failing case, and verify fixes before closing.',
    successRate: 0.82,
    tags: ['debugging', 'workflow'],
    technology: 'Generic',
    context: {
      focus: 'approach for debugging a new code file'
    }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

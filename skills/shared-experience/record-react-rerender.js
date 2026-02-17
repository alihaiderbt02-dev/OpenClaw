import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'record',
    agentId: 'code-expert',
    category: 'React',
    problem: 'Need to explain why React components re-render so shared knowledge is available.',
    solution: 'React re-renders when state changes, props change, context updates, parent re-renders, keys change, or hooks dependencies change, so keep state scoped, memoize components, and avoid needless prop/ctx updates.',
    successRate: 0.85,
    tags: ['React', 'state-management'],
    technology: 'React'
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error('failed', err);
});

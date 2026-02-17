import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'record',
    agentId: 'code-expert',
    category: 'React',
    problem: 'Need to improve React app performance across renders, bundles, and assets.',
    solution: 'Use memoization (React.memo/useMemo/useCallback), lazy-loaded routes/components, virtualized long lists, scoped state, optimized assets, and profiling tools to identify bottlenecks.',
    successRate: 0.85,
    tags: ['React', 'performance'],
    technology: 'React'
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error('failed', err);
});

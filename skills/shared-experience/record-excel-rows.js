import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'record',
    agentId: 'data-analyst',
    category: 'Excel',
    problem: 'Need a quick reminder on how to insert rows in Excel when a table grows.',
    solution: 'Select the row below where you want the new rows, right-click and choose Insert (or press Ctrl+Shift++), or use the Home → Insert → Insert Sheet Rows button. For multiple rows, select that many existing rows first, then hit Insert.',
    successRate: 0.8,
    tags: ['excel', 'workflow', 'data-analyst'],
    technology: 'Excel',
    context: {
      focus: 'growing tables and inserting rows'
    }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error('failed', err);
});

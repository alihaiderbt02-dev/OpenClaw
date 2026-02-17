import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'update',
    table: 'experiences',
    filters: [
      { column: 'id', operator: 'eq', value: 'b6bb295f-5424-460c-b431-4ac6649037e4' }
    ],
    data: {
      agent_role: 'Software Development Specialist',
      technology: 'CSS',
      context: {
        layout: 'flexbox/grid',
        pattern: 'Center items using justify/align or place-items'
      }
    }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error('failed', err);
});

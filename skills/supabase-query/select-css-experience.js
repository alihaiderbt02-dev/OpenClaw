import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'select',
    table: 'experiences',
    filters: [
      { column: 'id', operator: 'eq', value: 'b6bb295f-5424-460c-b431-4ac6649037e4' }
    ],
    limit: 1
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error('failed', err);
});

import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'select',
    table: 'products',
    filters: [
      { column: 'id', operator: 'eq', value: 5 }
    ],
    limit: 10
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

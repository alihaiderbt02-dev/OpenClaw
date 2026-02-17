import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'update',
    table: 'products',
    filters: [
      { column: 'id', operator: 'eq', value: 5 }
    ],
    data: {
      stock: 20
    }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

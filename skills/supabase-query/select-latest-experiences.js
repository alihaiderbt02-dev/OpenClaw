import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'select',
    table: 'experiences',
    limit: 20,
    order: { column: 'created_at', ascending: false }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

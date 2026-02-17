import skill from './skill.js';

async function run() {
  const result = await skill.execute({ action: 'select', table: 'products', limit: 50 });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

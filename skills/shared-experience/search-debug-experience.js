import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'search',
    tags: ['debugging']
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

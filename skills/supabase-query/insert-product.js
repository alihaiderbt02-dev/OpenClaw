import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'insert',
    table: 'products',
    data: {
      name: 'USB-B Cable',
      description: '2 ft charging cable',
      price: 10.99,
      stock: 100,
      category: 'Accessories'
    }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'insert',
    table: 'products',
    data: {
      name: 'IPhone 17 pro max',
      description: 'Latest IPhone',
      price: 170.99,
      stock: 10,
      category: 'Mobiles'
    }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch(err => {
  console.error('failed', err);
});

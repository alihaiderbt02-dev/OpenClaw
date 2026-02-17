import skill from './skill.js';

async function run() {
  const result = await skill.execute({
    action: 'record',
    agentId: 'project-manager',
    category: 'Project Management',
    problem: 'Need a repeatable reminder on how to improve project management skills through planning, communication, and reflection.',
    solution: 'Clarify scope and priorities, communicate decisions clearly, track progress with metrics, run retrospectives, and cultivate empathy and coaching with the team to level up project management.',
    successRate: 0.87,
    tags: ['project-management', 'teamwork'],
    technology: 'Project Management Tools',
    context: {
      focus: 'boosting PM skills after asking for help'
    }
  });
  console.log(JSON.stringify(result, null, 2));
}

run().catch((err) => {
  console.error('failed', err);
});

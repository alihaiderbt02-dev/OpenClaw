import { readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export default {
  name: 'get_agent_profile',
  description: 'Load agent profile and specialization info',

  parameters: {
    type: 'object',
    properties: {
      agentId: {
        type: 'string',
        description: 'Agent ID (e.g., code-expert, data-analyst)'
      }
    },
    required: ['agentId']
  },

  async execute({ agentId }) {
    try {
      const profilePath = join(
        homedir(),
        '.openclaw',
        'agent-profiles',
        `${agentId}.json`
      );

      const profile = JSON.parse(
        readFileSync(profilePath, 'utf8')
      );

      return {
        success: true,
        profile
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};

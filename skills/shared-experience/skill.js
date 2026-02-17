import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default {
  name: 'shared_experience',
  description:
    'Query and contribute to shared agent experiences. Use this to learn from past solutions and record new learnings.',

  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['search', 'record', 'update_usage', 'get_insights'],
        description: 'Action to perform'
      },

      // Search parameters
      category: {
        type: 'string',
        description: 'Category of experience (e.g., debugging, optimization)'
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'Tags to search for'
      },
      technology: {
        type: 'string',
        description: 'Technology/language (e.g., React, Python)'
      },
      minSuccessRate: {
        type: 'number',
        description: 'Minimum success rate (0.0-1.0)',
        default: 0.5
      },

      // Record parameters
      agentId: {
        type: 'string',
        description: 'ID of the agent recording the experience'
      },
      problem: {
        type: 'string',
        description: 'Description of the problem'
      },
      solution: {
        type: 'string',
        description: 'Description of the solution'
      },
      successRate: {
        type: 'number',
        description: 'Success rate of this solution (0.0-1.0)',
        default: 0.8
      },
      context: {
        type: 'object',
        description: 'Additional context (JSON)'
      }
    },
    required: ['action']
  },

  async execute(params) {
    try {
      switch (params.action) {
        case 'search':
          return await searchExperiences(params);

        case 'record':
          return await recordExperience(params);

        case 'update_usage':
          return await updateUsage(params);

        case 'get_insights':
          return await getInsights(params);

        default:
          throw new Error(`Unknown action: ${params.action}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// ============================================
// Search for relevant experiences
// ============================================

async function searchExperiences({
  category,
  tags,
  technology,
  minSuccessRate = 0.5
}) {
  let query = supabase
    .from('experiences')
    .select('*')
    .gte('success_rate', minSuccessRate)
    .order('success_rate', { ascending: false })
    .order('usage_count', { ascending: false })
    .limit(10);

  if (category) {
    query = query.eq('category', category);
  }

  if (technology) {
    query = query.ilike('technology', `%${technology}%`);
  }

  if (tags && tags.length > 0) {
    query = query.contains('tags', tags);
  }

  const { data, error } = await query;

  return {
    success: !error,
    experiences: data || [],
    count: data?.length || 0,
    error: error?.message
  };
}

// ============================================
// Record new experience
// ============================================

async function recordExperience({
  agentId,
  category,
  problem,
  solution,
  successRate = 0.8,
  tags = [],
  technology,
  context
}) {
  const { data, error } = await supabase
    .from('experiences')
    .insert({
      agent_id: agentId,
      category,
      problem,
      solution,
      success_rate: successRate,
      tags,
      technology,
      context
    })
    .select();

  return {
    success: !error,
    experience: data?.[0],
    message: error
      ? error.message
      : 'Experience recorded successfully'
  };
}

// ============================================
// Update usage count when experience is used
// ============================================

async function updateUsage({ experienceId }) {
  const { data, error } = await supabase.rpc('increment_usage', {
    exp_id: experienceId
  });

  return {
    success: !error
  };
}

// ============================================
// Get agent-specific insights
// ============================================

async function getInsights({ agentId }) {
  const { data, error } = await supabase
    .from('agent_insights')
    .select('*')
    .eq('agent_id', agentId)
    .order('discovered_at', { ascending: false });

  return {
    success: !error,
    insights: data || []
  }; 
}

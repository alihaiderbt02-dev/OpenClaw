import {
   createClient
} from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
   throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set');
}
const supabase = createClient(supabaseUrl, supabaseKey); 
export default {
   name: 'supabase_query',
   description: 'Query data from Supabase database. Use this to fetch, filter, and retrieve data from tables.',
   parameters: {
      type: 'object',
      properties: {
         action: {
            type: 'string',
            enum: ['select', 'count', 'insert', 'update', 'delete'],
            description: 'The database operation to perform'
         },
         table: {
            type: 'string',
            description: 'Name of the table to query'
         },
         columns: {
            type: 'string',
            description: 'Columns to select (default: "*" for all). Example: "id,name,email" or "*"',
            default: '*'
         },
         filters: {
            type: 'array',
            description: 'Array of filter conditions',
            items: {
               type: 'object',
               properties: {
                  column: {
                     type: 'string'
                  },
                  operator: {
                     type: 'string',
                     enum: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'in']
                  },
                  value: {}
               }
            }
         },
         order: {
            type: 'object',
            description: 'Sort order',
            properties: {
               column: {
                  type: 'string'
               },
               ascending: {
                  type: 'boolean',
                  default: true
               }
            }
         },
         limit: {
            type: 'integer',
            description: 'Maximum number of rows to return (default: 100, max: 1000)',
            default: 100,
            maximum: 1000
         },
         data: {
            type: 'object',
            description: 'Data for insert/update operations'
         }
      },
      required: ['action', 'table']
   },
   async execute({
      action,
      table,
      columns = '*',
      filters = [],
      order,
      limit = 100,
      data
   }) {
      try {
         let query;
         switch (action) {
            case 'select':
               query = supabase.from(table).select(columns);
               break;
            case 'count':
               query = supabase.from(table).select('*', {
                  count: 'exact',
                  head: true
               });
               break;
            case 'insert':
               if (!data) throw new Error('Data required for insert');
               query = supabase.from(table).insert(data).select();
               break;
            case 'update':
               if (!data) throw new Error('Data required for update');
               query = supabase.from(table).update(data);
               break;
            case 'delete':
               query = supabase.from(table).delete();
               break;
            default:
               throw new Error(`Unknown action: ${action}`);
         }
         if (filters && filters.length > 0) {
            filters.forEach(filter => {
               const {
                  column,
                  operator,
                  value
               } = filter;
               query = query[operator](column, value);
            });
         }
         if (order) {
            query = query.order(order.column, {
               ascending: order.ascending ?? true
            });
         }
         if (action === 'select' && limit) {
            query = query.limit(Math.min(limit, 1000));
         }
         const {
            data: result,
            error,
            count
         } = await query;
         if (error) {
            return {
               success: false,
               error: error.message,
               details: error
            };
         }
         return {
            success: true,
            action,
            table,
            data: result,
            count: count ?? result?.length ?? 0,
            message: `Successfully executed ${action} on ${table}`
         };
      } catch (err) {
         return {
            success: false,
            error: err.message,
            stack: err.stack
         };
      }
   }
};
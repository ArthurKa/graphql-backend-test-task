import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { graphql } from 'controllers';

import * as commits from './commits';

export const RootQuery = new GraphQLObjectType({
  name: 'QuerySchema',
  description: 'Root query schema.',
  fields: {
    commits: {
      type: new GraphQLList(commits.QueryType),
      description: 'GitHub repo commits.',
      args: {
        page: {
          type: GraphQLInt,
          defaultValue: 1,
          description: 'Page number.',
        },
        perPage: {
          type: GraphQLInt,
          defaultValue: 30,
          description: 'Items per page in range [1; 100].',
        },
      },
      resolve(_, params: Parameters<typeof graphql.commits.get>[0]): ReturnType<typeof graphql.commits.get> {
        return graphql.commits.get(params);
      },
    },
  },
});

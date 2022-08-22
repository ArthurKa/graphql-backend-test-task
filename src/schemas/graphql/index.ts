import { GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { graphql } from 'controllers';

import * as commits from './commits';
import * as tokens from './tokens';

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
    tokens: {
      type: new GraphQLList(tokens.QueryType),
      description: 'Generated API tokens.',
      resolve: graphql.tokens.find,
    },
  },
});

export const RootMutation = new GraphQLObjectType({
  name: 'MutationSchema',
  description: 'Root mutation schema.',
  fields: {
    generateNewApiToken: {
      type: tokens.QueryType,
      description: 'Generate new API token.',
      resolve() {
        return graphql.tokens.create();
      },
    },
  },
});

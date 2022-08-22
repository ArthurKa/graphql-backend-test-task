import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLField, Token } from 'types';

export const QueryType = new GraphQLObjectType({
  name: 'Token',
  description: 'Generated API token.',
  fields(): Record<keyof Token, GraphQLField> {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      token: {
        type: new GraphQLNonNull(GraphQLString),
      },
    };
  },
});

import { Commit } from 'controllers/github';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLField } from 'types';

export const QueryType = new GraphQLObjectType({
  name: 'Commit',
  description: 'GitHub repo commit.',
  fields(): Record<keyof Commit, GraphQLField> {
    return {
      sha: {
        type: new GraphQLNonNull(GraphQLString),
      },
      html_url: {
        type: new GraphQLNonNull(GraphQLString),
      },
      message: {
        type: new GraphQLNonNull(GraphQLString),
      },
      committer: {
        type: new GraphQLNonNull(new GraphQLObjectType({
          name: 'Committer',
          description: 'Commit author.',
          fields(): Record<keyof Commit['committer'], GraphQLField> {
            return {
              name: {
                type: new GraphQLNonNull(GraphQLString),
              },
              email: {
                type: new GraphQLNonNull(GraphQLString),
              },
              date: {
                type: new GraphQLNonNull(GraphQLString),
              },
            };
          },
        })),
      },
    };
  },
});

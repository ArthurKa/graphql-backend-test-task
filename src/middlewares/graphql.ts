import { GraphQLSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchemas } from 'schemas';

export const graphql = graphqlHTTP({
  graphiql: {
    headerEditorEnabled: true,
  },
  schema: new GraphQLSchema({
    query: graphqlSchemas.RootQuery,
    mutation: graphqlSchemas.RootMutation,
  }),
});

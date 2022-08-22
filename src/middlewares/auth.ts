import { IncomingMessage } from 'http';
import { ObjEntries, ObjFromEntries } from '@arthurka/ts-utils';

import { GraphQLField } from 'types';
import { tokenModel } from 'models';

const closedLabel = '[Closed with API token auth]';

export const withTokenAuth = (fields: Record<string, GraphQLField>): Record<string, GraphQLField> => (
  ObjFromEntries(
    ObjEntries(fields)
      .map(([key, { resolve, description, ...restField }]) => [
        key,
        {
          ...restField,
          description: description ? `${closedLabel}: ${description}` : closedLabel,
          ...resolve && {
            async resolve(...params) {
              const token = (params[2] as IncomingMessage | undefined)?.headers.authorization;

              if(token && await tokenModel.has(token)) {
                return resolve(...params);
              }

              return null;
            },
          },
        },
      ]),
  )
);

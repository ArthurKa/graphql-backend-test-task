import { ObjEntries } from '@arthurka/ts-utils';

export const makeUrl = (host: string, path: string, query: Record<string, string | number>): string => {
  const queryParams = (
    ObjEntries(query)
      .map(([key, val]) => `${key}=${val}`)
      .join('&')
  );

  return `${host}/${path}${queryParams ? `?${queryParams}` : ''}`;
};

import { array, object, string, custom } from 'zod';
import { isISODate, ISODate, isUrl, Url } from 'types';

export const _ = array(
  object({
    sha: string(),
    html_url: custom<Url>(isUrl),
    commit: object({
      message: string(),
      committer: object({
        name: string(),
        email: string().email(),
        date: custom<ISODate>(isISODate),
      }),
    }),
  }),
);

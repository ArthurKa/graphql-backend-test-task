import fetch from 'node-fetch';
import z, { array, object, string, custom, number } from 'zod';
import { isISODate, ISODate, isUrl, Url } from 'types';

const commitsSchema = array(
  object({
    sha: string(),
    html_url: custom<Url>(isUrl),
    commit: object({
      message: string(),
      author: object({
        date: custom<ISODate>(isISODate),
      }),
    }),
    committer: object({
      id: number().int(),
      login: string(),
      html_url: custom<Url>(isUrl),
      avatar_url: custom<Url>(isUrl),
      repos_url: custom<Url>(isUrl),
    }),
  }),
);

export type Commit = z.infer<typeof commitsSchema>[number];

export const fetchCommits = async (page = 1, perPage = 30) => {
  const fetchUrl = `https://api.github.com/repos/${process.env.GITHUB_REPO_NAME}/commits?page=${page}&per_page=${perPage}`;
  const rowData = await fetch(fetchUrl).then(e => e.json());
  return commitsSchema.parse(rowData);
};

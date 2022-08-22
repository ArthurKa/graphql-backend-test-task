import fetch from 'node-fetch';
import { commits } from 'schemas/zod';
import type { FetchCommitParams } from 'types';
import { makeUrl } from 'utils';

const githubApiHost = 'https://api.github.com';

export const fetchCommits = async ({ page, perPage }: FetchCommitParams) => {
  const url = makeUrl(githubApiHost, `repos/${process.env.GITHUB_REPO_NAME}/commits`, {
    page,
    per_page: perPage,
  });

  const rowData = await fetch(url).then(e => e.json());

  return commits._.parse(rowData).map(({ commit, ...rest }) => ({
    ...rest,
    ...commit,
  }));
};

export type Commit = Awaited<ReturnType<typeof fetchCommits>>[number];

import * as github from 'controllers/github';

export const get = (...params: Parameters<typeof github.fetchCommits>) => (
  github.fetchCommits(...params)
);

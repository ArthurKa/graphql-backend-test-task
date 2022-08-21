import { github } from 'services';

(async () => {
  const commits = await github.fetchCommits(2);
  console.info(commits.length);
  console.info(commits[0]);
})();

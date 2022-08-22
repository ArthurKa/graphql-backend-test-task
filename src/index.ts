import { app } from 'app';
import { tokenModel } from 'models';

(async () => {
  await tokenModel.prepare();

  const { PORT } = process.env;
  app.listen(PORT, () => console.info(`GraphQL API server running at localhost:${PORT}`));
})();

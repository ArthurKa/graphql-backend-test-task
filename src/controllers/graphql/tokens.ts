import * as api from 'controllers/api';

export const find = () => (
  api.tokens.getAll()
);

export const create = () => (
  api.tokens.create()
);

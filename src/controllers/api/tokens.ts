import { v4 as uuid } from 'uuid';
import { tokenModel } from 'models';

export const getAll = () => (
  tokenModel.find()
);

export const create = () => (
  tokenModel.create({ token: uuid() })
);

import { Router } from 'express';
import { graphql } from 'middlewares';

export const router = Router();

router.use('/', graphql);

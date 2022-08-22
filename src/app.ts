import express from 'express';
import { graphqlRouter } from 'routes';

export const app = express();

app.use('/', graphqlRouter);

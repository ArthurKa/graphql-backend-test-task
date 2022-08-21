import { Branded } from '@arthurka/ts-utils';

export type Url = Branded<string, 'url with protocol'>;
export const isUrl = (e: unknown): e is Url => (
  true
    && typeof e === 'string'
    && Boolean(e.match(/^https?:\/\//))
);

export type ISODate = Branded<string, 'ISO date'>;
export const isISODate = (e: unknown): e is ISODate => (
  true
    && typeof e === 'string'
    && !Number.isNaN(Date.parse(e))
);

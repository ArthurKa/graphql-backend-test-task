export interface TokenPayload {
  token: string;
}

export interface Token extends TokenPayload {
  id: number;
}

export interface FetchCommitParams {
  page: number;
  perPage: number;
}

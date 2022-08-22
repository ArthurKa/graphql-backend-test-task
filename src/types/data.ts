export interface TokenPayload {
  token: string;
}

export interface Token extends TokenPayload {
  id: number;
}

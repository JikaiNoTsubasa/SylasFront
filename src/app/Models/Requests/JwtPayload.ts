export interface JwtPayload {
    email: string;
    username: string;
    nameid: string; // ou sub, selon ce que tu mets dans les claims
    exp: number;
    [key: string]: any;
  }
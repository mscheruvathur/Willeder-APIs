import * as express from 'express';
type PromiseResponse = Promise<express.Response<any, Record<string, any>> | null | undefined>;

export type { PromiseResponse };
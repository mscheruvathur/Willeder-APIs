import argon2 from 'argon2';
import HttpStatusCode from '@constants/status';
import { APIError } from '../exceptions';
import { createHash } from 'crypto'

export const verifyPassword = async (hash: string, password: string) => {
    try {
        const isAMatch = await argon2.verify(hash, password);
        return isAMatch;
    } catch (e) {
        throw new APIError('invalid user or password', HttpStatusCode.UNAUTHORIZED);
    }
};

export const hashPassword = async (password: string) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (e: any) {
        throw new APIError(e.toString(), HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
};

export const md5Hash = (rawValue: string) => {
    return createHash('md5').update(rawValue).digest('hex')
}
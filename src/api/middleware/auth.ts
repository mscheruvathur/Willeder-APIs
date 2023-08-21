import { Request, Response, NextFunction } from "express"
import { PromiseResponse } from "@types"
import { sendResponse, throwErrorResponse } from "@utils/response"
import HttpStatusCode from "@constants/status";
import { IAccessTokenPayload, IRefreshTokenPayload } from "interfaces";
import { createAccessToken, createRefreshToken, verifyToken } from "@utils/jwt";
import { APIError } from "exceptions";
import env from "@constants/env";
import { v4 as uuidv4 } from 'uuid';
import { addDays, addHours } from "date-fns";

export enum AuthImportant {
    Loose,
    Strict
}

export const resolveToken = async ( req: Request, res: Response, next: NextFunction ): PromiseResponse => {
    try {
        const refreshToken = req.cookies[ '_rff-tkn' ] ?? req.headers[ 'refresh' ];
        if ( !refreshToken ) {
            throw new APIError( 'unauthorized', HttpStatusCode.UNAUTHORIZED );
        }

        const refreshTokenPayload: IRefreshTokenPayload = await verifyToken( refreshToken, env.JWT_ISSUER );

        if ( !refreshTokenPayload ) {
            throw new APIError( 'unauthorized', HttpStatusCode.UNAUTHORIZED );
        }


        const sessionInfo = ''

        if ( !sessionInfo ) {
            throw new APIError( 'unauthorized', HttpStatusCode.UNAUTHORIZED );
        }

        const refreshTokenKey = uuidv4();
        const accessTokenKey = uuidv4();

        const accessTokenPayload: IAccessTokenPayload = {
            name: '',
            email: '',
            utk: accessTokenKey,
            uuid: '',
            employeeType: ''
        };

        const newRefreshTokenPayload: IRefreshTokenPayload = {
            key: refreshTokenKey
        };

        const accessToken = await createAccessToken( accessTokenPayload, env.JWT_ISSUER );

        const newRefreshToken = await createRefreshToken( newRefreshTokenPayload, env.JWT_ISSUER );

        if ( !accessToken && !refreshToken ) {
            throw APIError.Unauthorized();
        }

        const sessionUpdateResponse = ''

        if ( !sessionUpdateResponse ) {
            throw APIError.Unauthorized();
        }
        const currentDate = new Date( Date.now() );

        res.cookie( '_rff-tkn', newRefreshToken, {
            domain: env.COOKIE_DOMAIN,
            httpOnly: true,
            secure: env.COOKIE_SECURE,
            sameSite: env.COOKIE_SAME_SITE,
            expires: addDays( currentDate, 7 )
        } );

        res.cookie( '_acc-tkn', accessToken, {
            domain: env.COOKIE_DOMAIN,
            httpOnly: true,
            secure: env.COOKIE_SECURE,
            sameSite: env.COOKIE_SAME_SITE,
            expires: addHours( currentDate, 2 )
        } );

        return sendResponse( res, 'success', {
            message: 'tokens refreshed',
            data: {
                accessToken: accessToken,
                refreshToken: newRefreshToken,
                exp: {
                    access: addHours( currentDate, 2 ),
                    refresh: addDays( currentDate, 7 )
                }
            },
            status: HttpStatusCode.CREATED
        } );

    } catch ( err ) {
        return throwErrorResponse( res, err )
    }
}

export const logout = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const accessToken: string = req.cookies[ '_acc-tkn' ] ?? req.headers[ 'authorization' ];
        const refreshToken: string = req.cookies[ '_rff-tkn' ] ?? req.headers[ 'refresh' ];

        if ( !accessToken || !refreshToken ) {
            throw APIError.Unauthorized();
        }

        const refreshTokenPayload: IRefreshTokenPayload = await verifyToken( refreshToken, env.JWT_ISSUER );

        res.clearCookie( '_rff-tkn', {
            domain: env.COOKIE_DOMAIN
        } );
        res.clearCookie( '_acc-tkn', {
            domain: env.COOKIE_DOMAIN
        } );

        return sendResponse( res, 'success', {
            message: 'employee logged out',
            status: HttpStatusCode.NO_CONTENT,
            data: {}
        } );
    } catch ( e ) {
        return throwErrorResponse( res, e );
    }
}

const strictAuth = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const accessToken: string = req.cookies[ '_acc-tkn' ] ?? req.headers[ 'authorization' ];
        const refreshToken: string = req.cookies[ '_rff-tkn' ] ?? req.headers[ 'refresh' ];



        if ( accessToken && refreshToken ) {
            const sessionInfo = ''

            if ( sessionInfo ) {
                const accessTokenPayload: IAccessTokenPayload = await verifyToken( accessToken, env.JWT_ISSUER );
                const refreshTokenPayload: IRefreshTokenPayload = await verifyToken( refreshToken, env.JWT_ISSUER );

                if ( accessTokenPayload && refreshTokenPayload ) {
                    const employeeObjectId = accessTokenPayload[ 'uuid' ] ?? '';

                    // req.employee = employee;
                    next();
                }
            } else {
                throw APIError.Unauthorized();
            }
        } else {
            throw APIError.Unauthorized();
        }

    } catch ( e ) {
        return throwErrorResponse( res, e );
    }
}

const looseAuth = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const accessToken = req.cookies[ '_acc-tkn' ] ?? req.headers[ 'authorization' ];
        const refreshToken = req.cookies[ '_rff-tkn' ] ?? req.headers[ 'refresh' ];




        if ( accessToken && refreshToken ) {
            const sessionInfo = ''

            if ( sessionInfo ) {
                const accessTokenPayload: IAccessTokenPayload = await verifyToken( accessToken, env.JWT_ISSUER );
                const refreshTokenPayload: IRefreshTokenPayload = await verifyToken( refreshToken, env.JWT_ISSUER );

                if ( accessTokenPayload && refreshTokenPayload ) {
                    const employeeObjectId = accessTokenPayload[ 'uuid' ] ?? '';

                    // req.employee = employee;
                    next();
                }
            } else {
                next();
            }
        } else {
            next();
        }

    } catch ( e ) {
        next();
    }
}

export const verifyPassword = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const accessToken = req.headers[ 'authorization' ];

        if ( accessToken ) {
            const sessionInfo = ''

            if ( sessionInfo ) {
                // const accessTokenPayload: IPasswordResetPayload = await verifyToken(accessToken, env.JWT_ISSUER);

                // if (accessTokenPayload) {
                //     const employeeObjectId = accessTokenPayload['uuid'] ?? '';
                //     const employeeController = new EmployeeController(employeeObjectId);
                //     const employee = await employeeController.currentEmployee();
                //     req.employee = employee;
                //     next();
                // }
            } else {
                throw APIError.Unauthorized();
            }
        } else {
            throw APIError.Unauthorized();
        }
    } catch ( e ) {
        return throwErrorResponse( res, e );
    }
}

export const useAuth = ( importance: AuthImportant ) => {
    if ( importance === AuthImportant.Strict ) {
        return ( req: Request, res: Response, next: NextFunction ) => strictAuth( req, res, next );
    } else if ( importance === AuthImportant.Loose ) {
        return ( req: Request, res: Response, next: NextFunction ) => looseAuth( req, res, next );
    } else {
        return ( req: Request, res: Response ) =>
            sendResponse( res, 'error', {
                message: 'unauthorized',
                status: HttpStatusCode.UNAUTHORIZED,
                data: {}
            } );
    }
};
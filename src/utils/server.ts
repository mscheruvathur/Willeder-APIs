import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors'
import logger, { logStream } from "lib/logging";
import * as ua from 'express-useragent';
import helmet from 'helmet';
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import { throwErrorResponse } from "./response";
import mainRouter from "api/router";
export default async function createServer () {

    const app: Express = express();

    app.use( cors( {
        origin: async ( origin, callback ) => {
            if ( origin ) {
                if ( origin.includes( 'localhost' ) ) {
                    logger.info( 'CORS: Localhost' );
                    return callback( null, [ origin ] );
                }
                const allowedOrigins: string[] = [];
                return callback( null, allowedOrigins );
            }
            logger.info( 'CORS: No origin' );
            callback( null, '*' );
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    } ) );

    app.set( 'trust proxy', true );
    app.use( ua.express() );
    app.use( helmet() );

    app.use(
        morgan( ':method :url :status :res[content-length] - :response-time ms', {
            stream: logStream
        } )
    )

    app.use(
        express.json( {
            limit: '1024kb'
        } )
    )

    app.use(
        express.urlencoded( {
            extended: true,
            limit: '1024kb'
        } )
    );
    app.use( cookieParser() );


    const versionPrefix = '/api/v1';

    app.use(`${versionPrefix}/users`, mainRouter)

    app.use( ( err: Error, req: Request, res: Response, next: NextFunction ) => {
        const response = throwErrorResponse( res, err );

        if ( !response ) {
            next()
        } else {
            return response;
        }
    } );

    return {
        app
    };

}
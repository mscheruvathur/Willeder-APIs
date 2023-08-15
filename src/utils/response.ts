import { Response } from "express"
import HttpStatusCode from "constants/status";
import { APIError } from "exceptions";
import { UNKNOWN_ERROR } from "constants/operationalErrors";
import logger from "lib/logging";

interface IResponse {
    status: number;
    message: {
        message: string;
        data?: any;
    };
}


const sendResponse = ( res: Response, type: 'success' | 'error', options: { status?: number, message: string, data: unknown } ) => {
    let { status, message, data } = options;

    if ( !status ) {
        status = type === 'success' ? HttpStatusCode.OK : HttpStatusCode.INTERNAL_SERVER_ERROR;
    }

    const response: IResponse = {
        status: status,
        message: {
            message: message
        }
    }

    if ( data ) {
        response.message.data = data;
    }

    return res.status( status ).json( response ).end();
}


const throwErrorResponse = ( res: Response, e: unknown ) => {
    if ( e instanceof APIError ) {
        const errorData = {
            error: { operationErrorCode: e.operationErrorCode ?? UNKNOWN_ERROR }
        };

        return sendResponse( res, 'error', {
            message: e.message,
            status: e.statusCode,
            data: errorData
        } );
    }

    logger.error( JSON.stringify( e ) );
}

export { sendResponse, throwErrorResponse };
import { Request, Response, NextFunction } from "express";
import { APIError } from "exceptions";
import { sendResponse, throwErrorResponse } from "utils/response";
import HttpStatusCode from "constants/status";

export default class UserController {
    static async register ( req: Request, res: Response, next: NextFunction ) {
        try {

            const {email, password, name, mobile, address }: {email: string, password: string, name: string, mobile: string, address: string} = req.body;

            return sendResponse(res, 'success', {
                message: 'user registered successfully',
                status: HttpStatusCode.CREATED,
                data: {
                    email: email,
                    password: password,
                    name: name,
                    mobile: mobile,
                    address: address
                }
            })
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async login ( req: Request, res: Response, next: NextFunction ) {
        try {

            const {email, password} :{email: string, password: string} = req.body;

            return sendResponse(res, 'success',{
                message: 'user login success',
                status: HttpStatusCode.OK,
                data: {}
            })
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async logout ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse(res, 'success',{
                message: '',
                status: HttpStatusCode.NO_CONTENT,
                data: {}
            })
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async forgotPassword ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse(res, 'success',{
                message: '',
                status: HttpStatusCode.ACCEPTED,
                data: {}
            })
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async updatePassword ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse(res, 'success',{
                message: '',
                status: HttpStatusCode.ACCEPTED,
                data: {}
            })
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async refresh ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse(res, 'success',{
                message: '',
                status: HttpStatusCode.ACCEPTED,
                data: {}
            })
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

}
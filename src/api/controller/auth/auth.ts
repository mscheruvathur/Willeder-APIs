import { Request, Response, NextFunction } from "express";
import { sendResponse, throwErrorResponse } from "utils/response";
import HttpStatusCode from "constants/status";
import { UserDocument } from "models/user/user.entity";
import { getCurrentJST } from "@utils/dayjs";
import {v4 as uuidv4} from 'uuid';
import {addUser, getUser} from 'models/user';
import { hashPassword } from "@utils/hasher";
import { APIError } from "exceptions";

export default class UserController {
    static async register ( req: Request, res: Response, next: NextFunction ) {
        try {

            const { email, password, name, phone, address }: { email: string, password: string, name: string, phone: string, address: string } = req.body;

             await getUser(email);
            // console.log(DOES_EXIST, 'DOES_EXIST')
            // if (DOES_EXIST) {
            //     throw APIError.BadRequest('User with the given email is exist')
            // }

            const userCreationDocument: UserDocument = {
                user_id: uuidv4(),
                email: email,
                password: await hashPassword(password),
                name: name,
                phone: phone,
                address: address,
                status: 'active',
                created_at: getCurrentJST(),
                updated_at: getCurrentJST(),
                deleted_at:getCurrentJST() ,
                refresh_token: 'undefined'
            }

            await addUser(userCreationDocument);

            return sendResponse(res, 'success', {
                message: 'user registered successfully',
                status: HttpStatusCode.CREATED,
                data: {}
            })


        } catch ( err ) {
            console.log( err )
            return throwErrorResponse( res, err )
        }
    }


    static async login ( req: Request, res: Response, next: NextFunction ) {
        try {

            const { email, password }: { email: string, password: string } = req.body;

            return sendResponse( res, 'success', {
                message: 'user login success',
                status: HttpStatusCode.OK,
                data: {}
            } )
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async logout ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse( res, 'success', {
                message: '',
                status: HttpStatusCode.NO_CONTENT,
                data: {}
            } )
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async forgotPassword ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse( res, 'success', {
                message: '',
                status: HttpStatusCode.ACCEPTED,
                data: {}
            } )
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async updatePassword ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse( res, 'success', {
                message: '',
                status: HttpStatusCode.ACCEPTED,
                data: {}
            } )
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

    static async refresh ( req: Request, res: Response, next: NextFunction ) {
        try {
            return sendResponse( res, 'success', {
                message: '',
                status: HttpStatusCode.ACCEPTED,
                data: {}
            } )
        } catch ( err ) {
            return throwErrorResponse( res, err )
        }
    }

}


declare global {
    namespace Express {

        interface Request {
            user: {
                id: string
            }
        }

        interface Response {
            tempResponse: any
        }

    }
}
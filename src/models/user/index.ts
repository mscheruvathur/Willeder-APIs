import { db } from "@utils/firebase";
import { USER_COLLECTION_KEY, UserDocument, userConverter } from "./user.entity";
import { APIError } from "exceptions";
import HttpStatusCode from "constants/status";
import { getDatabase } from "firebase-admin/database";


export const addUser = async (user: UserDocument) => {
    try {

        const entry = db.collection(USER_COLLECTION_KEY).doc();
        await entry.set(user);
        return true

    } catch (err) {
        throw new APIError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
}

export const updateUser = async (id: string, data: any) => {
    try {
        const entry = db.collection(USER_COLLECTION_KEY).doc(id);
        await entry.update(data)
        return true
    } catch(err) {
        throw new APIError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
}


export const getUser = async (email: string) => {
    try {

        const userRef = db.collection(USER_COLLECTION_KEY).doc(email)

        const doc = await userRef.get();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
          }


    } catch(err) {
        throw new APIError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
}
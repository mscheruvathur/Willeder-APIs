import { db } from "utils/firebase";
import { USER_COLLECTION_KEY, UserDocument, userConverter } from "./user.entity";

export const addUser = async ( user: UserDocument ) => {
    try {
        const docRef = db.collection( USER_COLLECTION_KEY ).doc( user.user_id ).withConverter( userConverter );
        const docSnap = await docRef.get();
        return docSnap.data();
    } catch ( err ) {
        return Promise.reject( err );
    }
}
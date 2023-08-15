import admin, { firestore } from "firebase-admin";
import env from "constants/env";

const credentials = require('../serviceAccountKey.json')


admin.initializeApp( {
    credential: admin.credential.cert( credentials )
} );

const db = firestore();
const adminAuth = admin.auth();
export {db, adminAuth}
import admin, { firestore } from "firebase-admin";
const credentials = require('../../bootstrap/serviceAccountKey.json')
admin.initializeApp( {
    credential: admin.credential.cert( credentials )
} );

const db = firestore();
const adminAuth = admin.auth();
export {db, adminAuth}
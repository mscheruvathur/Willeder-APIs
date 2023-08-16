const { initializeApp, applicationDefault, cert } = require( 'firebase-admin/app' );
const { getFirestore, Timestamp, FieldValue, Filter } = require( 'firebase-admin/firestore' );


const firebaseConfig = {
    apiKey: "AIzaSyDs4-dN-XfEyICIibxoI_1TtHbDznpHhTU",
    authDomain: "apis-22819.firebaseapp.com",
    projectId: "apis-22819",
    storageBucket: "apis-22819.appspot.com",
    messagingSenderId: "584733037394",
    appId: "1:584733037394:web:a64afe1d51ea786bf1e08b",
    measurementId: "G-CCM3F44NZF"
};

initializeApp( {
    credential: cert( firebaseConfig )
} );

const db = getFirestore();

export {db}

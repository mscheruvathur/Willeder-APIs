import path from 'path';

const JWT_PUBLIC_KEY_PATH = path.join( __dirname, '../', '../', 'keys', 'public.pem' );
const JWT_PRIVATE_KEY_PATH = path.join( __dirname, '../', '../', 'keys', 'private.pem' );
const SERVICE_ACCOUNT_PATH = path.join( __dirname, '../', '../', 'bootstrap', 'serviceAccountKey.json' );

const JWT_ALGORITHM = 'RS256';

export { JWT_PUBLIC_KEY_PATH, JWT_PRIVATE_KEY_PATH, JWT_ALGORITHM, SERVICE_ACCOUNT_PATH }
import { config } from 'dotenv'
import { EnvError, bool, cleanEnv, makeValidator, num, port, str, url } from 'envalid'

config();


const isValidURL = ( url: string ) => {
    try {

        const urlObject = new URL( url );
        return urlObject.protocol === 'https:' || urlObject.protocol === 'http:';

    } catch ( e ) {
        return false
    }
}

const validateCORSOrigins = makeValidator( ( origins ) => {
    const splitOrigins = origins.split( ' ' );

    if ( splitOrigins.length === 1 ) {
        if ( isValidURL( origins ) ) {
            return splitOrigins[ 0 ].trim();
        }
        throw new EnvError( 'Defined origins should be urls' );
    } else {
        for ( const origin of splitOrigins ) {
            if ( !isValidURL( origin ) ) {
                throw new EnvError( `${ origin }  is not a valid url.` )
            }
        }
        return splitOrigins;
    }
} )

const env = cleanEnv(
    process.env, {

    INSTANCES: num( { default: 1, devDefault: 1 } ),


    PORT: port( { default: 3001, devDefault: 3001, desc: 'Port on which Express server will start' } ),
    BASE_API_URL: str( { default: `http://localhost:3001`, devDefault: `http://localhost:3001`, desc: 'Host and Port together' } ),

    NODE_ENV: str( { choices: [ 'development', 'production', 'staging' ] } ),
    CORS_ORIGINS: validateCORSOrigins(),

    // Cookie + CORS Config
    COOKIE_DOMAIN: str(),
    CONTROL_PANEL_COOKIE_DOMAIN: str(),
    COOKIE_SECURE: bool(),
    COOKIE_SAME_SITE: str({
        choices: ['lax', 'strict', 'none'] as const,
        default: 'strict'
    }),

    // JWT Config
    JWT_AUDIENCE: str(),
    JWT_ISSUER: str(),

} );

export default env;
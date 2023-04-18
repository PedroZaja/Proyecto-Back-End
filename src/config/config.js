import dotenv from 'dotenv';

//import program from '../process.js';

//const environment = program.opts().mode;

dotenv.config();

/*dotenv.config({

    path:environment==="develop"?"./.env.development":"./.env.production"

});*/

export default {

    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD

};
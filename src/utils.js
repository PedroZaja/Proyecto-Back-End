import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Crypto functions
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}

//JSON Web Tokens JWT functinos:
const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
};
/**
 * Metodo que autentica el token JWT para nuestros requests.
 * OJO: Esto actúa como un middleware, observar el next.
 * @param {*} req Objeto de request
 * @param {*} res Objeto de response
 * @param {*} next Pasar al siguiente evento.
 */
export const authToken = (req, res, next) => {
   
    const authHeader = req.headers.authorization;
    console.log("Token de autorizacion: ");
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({error: "No existe un Token valido!"});
    }
    const token = authHeader.split(' ')[1]; 
    
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: "Token invalido!"});
        //Token OK
        req.user = credentials.user;
        console.log(req.user);
        next();
    });
};
export default __dirname;
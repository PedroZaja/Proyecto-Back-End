import passport from "passport";
import passportLocal from "passport-local";
import userModel from "../dao/db/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) =>{
            const {first_name, last_name, email, age} = req.body;
            try{
                const exists = await userModel.findOne({email});
                if (exists){
                    console.log("El usuario ya existe!");
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password : createHash(password)
                };
                const result = await userModel.create(user);
                return done(null, result);
            }catch(error){
                return done("Error registrando usuario: "+ error);

            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });

};

export default initializePassport;
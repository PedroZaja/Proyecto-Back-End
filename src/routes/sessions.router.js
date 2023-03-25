import { Router } from 'express';
import userModel from '../dao/db/models/user.model.js';
import {createHash, isValidPassword} from '../utils.js';
import passport from 'passport';


const router = Router();

router.post("/register", passport.authenticate(
    'register', {failureRedirect: '/fail-register'})
    , async (req, res)=>{
    console.log("Registrando usuario!");
    res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
});

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email,password});
    if(!user) return res.status(401).send({status:"error",error: "El usuario o la contraseña no es correcta!"});
    if (!isValidPassword(user, password)){
        return res.status(401).send({status: "error", error: "El usuario o la contraseña no es correcta!"})
    }
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
});

export default router;
import {authorization, passportCall} from "./../utils.js"

import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/",
    
    passportCall('jwt'),
    authorization('user'),
    (req, res) =>{
    res.render("profile", {
        user: req.user
    });
});

router.get("/current", passportCall('jwt'), authorization('user'), (req, res) => {
    res.send(req.user);
})

router.get("/logout", (req, res) =>{
    req.user = null
    res.redirect('/users/login')

});

export default router;
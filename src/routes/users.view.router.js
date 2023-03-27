import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/", (req, res) =>{
    res.render("profile", {
        user: req.session.user
    });
});

router.get("/logout", (req, res) =>{
    req.session.destroy( err => {
        if (!err) {
            res.redirect('/users/login')
        }
    })
});

export default router;
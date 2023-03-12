import ProductManager from "../dao/filesystem/models/ProductManager.js";
import {Router} from "express";
import __dirname from "../utils.js";

const router = Router();
    
router.get("/", (req, res) => {
    const pm = new ProductManager("./productos.json");
    const products = pm.getProducts();
    res.render("home", {products});
})

router.get("/realtimeproducts", (req, res) => {
    const pm = new ProductManager("./productos.json");
    const products = pm.getProducts();
    res.render("realTimeProducts", {products} );
})

router.get("/productsHandlerWebSockets", (req, res) => {
    res.render("productsHandlerWebSockets", {});
})

router.get("/chats", (req, res) => {
    res.render("chats", {});
})


export default router; 
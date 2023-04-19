import {authorization, passportCall} from "./../utils.js"
import ProductManager from "../dao/filesystem/models/ProductManager.js";
import {Router} from "express";
import __dirname from "../utils.js";
import { authToken } from "../utils.js";
import { cartsModel } from "../dao/db/models/carts.model.js";
import passport from "passport";
import { productModel } from "../dao/db/models/products.model.js";

const router = Router();

router.get("/",  (req, res) => {
    const pm = new ProductManager("./productos.json");
    const products = pm.getProducts();
    res.render("home", {products});
})

router.get("/realtimeproducts" ,(req, res) => {
    const pm = new ProductManager("./productos.json");
    const products = pm.getProducts();
    res.render("realTimeProducts", {products} );
})

router.get("/productsHandlerWebSockets" ,  (req, res) => {
    res.render("productsHandlerWebSockets", {});
})

router.get("/chats" , (req, res) => {
    res.render("chats", {});
})

router.get("/products",passportCall('jwt'), authorization('user') ,async (req, res) => {
    try {
        let { limit , page , sort , query } = req.query;
        let queryObj = JSON.parse(query ? query : "{}")
        let user = req.user

        let resultQuery = await productModel.paginate(queryObj ? queryObj : {}, { limit: (limit ? limit : 10) , page: (page ? page : 1) , sort: {price: (sort ? sort : 1 )}, lean: true})

        let prevLink = resultQuery.hasPrevPage  ? `http://localhost:8080/api/views/products?limit=${limit ? limit : 10}&page=${resultQuery.prevPage}` : ''
        let nextLink = resultQuery.hasNextPage ? `http://localhost:8080/api/views/products?limit=${limit ? limit : 10}&page=${resultQuery.nextPage}` : ''

        res.render("products", {resultQuery, prevLink, nextLink, page, user});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
    
})

router.get("/carts/:cid" ,async (req, res) => {

    try {
        const { cid } = req.params;
        let carts = await cartsModel.findById(cid).populate("products.product").lean()

        res.render("carts", {carts});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


export default router; 
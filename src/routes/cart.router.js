import {Router} from "express";
import { cartsModel } from "./../dao/db/models/carts.model.js"
import { productModel } from "./../dao/db/models/products.model.js"

const dirPath = "./carrito.json";
const router = Router();




router.post("/", async (req,res) => {
    try {
        let newCart = await cartsModel.create({})
        res.status(201).json(newCart)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/:cid/product/:pid", async (req,res) => {
    const { cid , pid } = req.params;
    try {
        let productExists = await productModel.findById(pid)
        
        if (!productExists) {
            res.status(404).json( {message: "El producto no existe"})
        }
        let auxCart = await cartsModel.findById(cid);
        if (auxCart.products.length == 0) {
            let product = [{id: pid, quantity:1}]
            res.status(200).json( await cartsModel.updateOne({_id:cid}, {products: product}))
        }else{
            let products = [];
            let updateProduct = auxCart.products.filter(oneProd => oneProd._id === pid) 
            let newQuantity = 1;
            if (updateProduct.length > 0) {
                newQuantity = parseInt(updateProduct[0].quantity) + 1
                products = auxCart.products.map(
                    (oneProd) => {
                        if (oneProd._id === pid){
                            oneProd = {_id: pid,quantity: parseInt(newQuantity)}
                        }  
                        return oneProd
                    }
                    )
            }else{
                products = auxCart.products;
                products.push({_id: pid, quantity: 1})
            }
            res.status(200).json( await cartsModel.updateOne({_id:cid}, {products: products}))
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/:cid', async (req,res) => {
    const { cid } = req.params;
    try {
        res.status(200).json( await cartsModel.findById(cid))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});




export default router;
import {Router} from "express";
import { cartsModel } from "./../dao/db/models/carts.model.js"

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

router.put("/:cid", async (req,res) => {
    const { cid } = req.params;
    let body = req.body
    try {
        res.status(200).json( await cartsModel.updateOne({_id:cid}, {products: body}))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/:cid', async (req,res) => {
    const { cid } = req.params;
    try {
        res.status(200).json( await cartsModel.findById(cid).populate("products.product"))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.delete("/:cid", async (req,res) => {
    const { cid } = req.params;
    try {
        res.status(200).json(await cartsModel.updateOne({_id:cid}, {products: []}))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/:cid/product/:pid", async (req,res) => {
    const { cid , pid } = req.params;
    try {
        
        
        let productAlreadyInCart = await cartsModel.find({products: {$elemMatch: {product: pid}}})
        
        let auxCart = await cartsModel.findById(cid)
        if (productAlreadyInCart == 0) {
            auxCart.products.push({product:pid, quantity: 1})
            res.status(200).json( await cartsModel.updateOne({_id:cid}, auxCart))
        }else{
            let updateProduct = auxCart.products.filter(oneProd => oneProd.product == pid)

            res.status(200).json( await cartsModel.findOneAndUpdate({_id:cid, "products.product": pid}, {$set: {"products.$.quantity": updateProduct[0].quantity + 1}}, { new: true }))
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.delete("/:cid/products/:pid", async (req,res) => {
    try {
        const { cid , pid } = req.params;
        let result = await cartsModel.findByIdAndUpdate({_id:cid},
            { $pull: { products: {product: pid}} } ,
            { new: true }
            );
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.put("/:cid/products/:pid", async (req,res) => {
    const { cid , pid } = req.params;
    let body = req.body
    try {
        res.status(200).json( await cartsModel.findOneAndUpdate({_id:cid, "products.product": pid}, {$set: {"products.$.quantity": parseInt(body.quantity)}}, { new: true }))
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


export default router;
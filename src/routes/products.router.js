import {Router} from "express";
import { productModel } from "./../dao/db/models/products.model.js"

const productsRouter = Router();

productsRouter.get('/', async (req,res) => {
    const { limit } = req.query;
    try {
        if (!limit) {
            res.status(200).json( await productModel.find({}))
        }else{
            res.status(200).json(await productModel.find().limit(limit));
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

productsRouter.post('/', async (req, res) => {
    const body = req.body;
    try {
        let newProduct = await productModel.create(body);
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
})

productsRouter.get('/:pid', async (req,res) => {
    const { pid } = req.params;
    try {
        res.status(200).json( await productModel.findById(pid) )
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

productsRouter.put("/:pid", async (req,res) => {
    const { pid } = req.params;
    const body = req.body
    try {
        let message = await productModel.updateOne({_id:pid},body);
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    const { pid } = req.params;
    try {
        let message = await productModel.deleteOne({_id: pid})
        res.status(200).json({message})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export {productsRouter};

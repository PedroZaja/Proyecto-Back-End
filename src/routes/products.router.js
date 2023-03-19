import {Router} from "express";
import { productModel } from "./../dao/db/models/products.model.js"

const productsRouter = Router();
const PORT = 8080;
 
productsRouter.get('/', async (req,res) => {
    let { limit , page , sort , query } = req.query;
    let result = {}
    
    try {
        let queryObj = JSON.parse(query ? query : "{}")
        let resultQuery = await productModel.paginate(queryObj ? queryObj : {}, { limit: (limit ? limit : 10) , page: (page ? page : 1) , sort: {price: (sort ? sort : 1 )}})
        result = {
            status: "success",
            payload: resultQuery.docs,
            totalPages: resultQuery.totalPages,
            prevPage: resultQuery?.prevPage || null,
            nextPage: resultQuery?.nextPage || null,
            page: resultQuery.page,
            hasPrevPage: resultQuery?.hasPrevPage,
            hasNextPage: resultQuery?.hasNextPage,
            prevLink: resultQuery?.hasPrevPage != false  ? `http://localhost:8080/api/products?limit=${(limit ? limit : 10)}&page=${parseInt((page ? page : 1))-1}&query=${query ? query : "{}"}&sort=${(sort ? sort : 1 )}` : null ,
            nextLink: resultQuery?.hasNextPage != false ? `http://localhost:8080/api/products?limit=${(limit ? limit : 10)}&page=${parseInt((page ? page : 1))+1}&query=${query ? query : "{}"}&sort=${(sort ? sort : 1 )}` : null
        }
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({status: "error" , message: error.message});
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
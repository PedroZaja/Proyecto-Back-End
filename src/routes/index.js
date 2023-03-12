//Centralizo mis routers aqui

import __dirname from "../utils.js"
import cartRouter from "./cart.router.js"
import {productsRouter} from "./products.router.js"
import viewsRouter from "./views.router.js"

function routerApi(app){
    app.use("/api/products",productsRouter )
    app.use("/api/carts",cartRouter )
    app.use("/api/", viewsRouter)

}

export default routerApi;
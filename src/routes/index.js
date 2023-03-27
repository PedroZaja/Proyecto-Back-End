import __dirname from "../utils.js"
import cartRouter from "./cart.router.js"
import {productsRouter} from "./products.router.js"
import sessionsRouter from "./sessions.router.js"
import usersViewRouter from "./users.view.router.js";
import viewsRouter from "./views.router.js"

function routerApi(app){
    app.use("/api/products",productsRouter )
    app.use("/api/carts",cartRouter )
    app.use("/api/views", viewsRouter)
    app.use("/users", usersViewRouter);
    app.use("/api/sessions", sessionsRouter);

}

export default routerApi;
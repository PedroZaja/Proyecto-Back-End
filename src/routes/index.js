import __dirname from "../utils.js"
import cartRouter from "./cart.router.js"
import githubLoginViewRouter from "./github-login.views.router.js"
import jwtRouter from "./jwt.router.js"
import {productsRouter} from "./products.router.js"
import sessionsRouter from "./sessions.router.js"
import usersViewRouter from "./users.view.router.js";
import viewsRouter from "./views.router.js"

function routerApi(app){
    app.use("/", viewsRouter);
    app.use("/github", githubLoginViewRouter);
    app.use("/users", usersViewRouter);
    app.use("/api/carts",cartRouter );
    app.use("/api/products",productsRouter );
    app.use("/api/jwt", jwtRouter);
    app.use("/api/sessions", sessionsRouter);

}

export default routerApi;
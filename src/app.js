import {MONGO_URL, sessionJSON, socketFunctions}  from "./services/app.service.js"
import express, { application } from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars"
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import routerApi from "./routes/index.js";
import session from 'express-session';
import viewRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersViewRouter from "./routes/users.view.router.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import githubLoginViewRouter from './routes/github-login.views.router.js'
import config from "./config/config.js";


const PORT = config.port;
const app = express();

app.use(express.static(__dirname + "/public"))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars") 

app.use(cookieParser());

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {UseNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: "PedroSecret",
    resave: false,
    saveUnitialized: true
}))


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewRouter);
app.use("/users", usersViewRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/github", githubLoginViewRouter);


app.listen(PORT, () => {
    console.log("Servidro escuchando en el puerto " + PORT)
})


const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Conectado a MongoDB via Mongoose");
    } catch (error) {
        console.error("No se pudo conectad a la BD usando Mongoose: " + error);
        process.exit();
    }
};

connectMongoDB();


//const socketServer = socketFunctions(httpServer)


routerApi(app);
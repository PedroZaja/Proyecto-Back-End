import __dirname from "./utils.js";
import express from "express";
import handlebars from "express-handlebars"
import mongoose from 'mongoose';
import routerApi from "./routes/index.js";
import socketFunctions from "./services/app.service.js"
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import usersViewRouter from "./routes/users.router.js";
import session from "express-session";
import sessionsRouter from "./routes/sessions.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import viewRouter from "./routes/views.router.js";


const PORT = 8080;
const myApp = express();
const MONGO_URL = "mongodb+srv://PedroZaja:pedrozaja@pedrozaja.nsf6vel.mongodb.net/zaja-tecno?retryWrites=true&w=majority"

//Añado esto para poder usar los elementos publicos
myApp.use(express.static(__dirname + "/public"))

//Preparar la configuración del Server para recubir objetos JSON
myApp.use(express.json());
myApp.use(express.urlencoded({ extended: true }));

//Handlebars
myApp.engine("handlebars", handlebars.engine());
myApp.set("views", __dirname + "/views");
myApp.set("view engine", "handlebars") //Nos permite usar el response.render()

myApp.use(cookieParser());

myApp.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: {UseNewUrlParser: true, useUnifiedTopology: true}
    }),
    secret: "PedroSecret",
    resave: false,
    saveUnitialized: true
}))


initializePassport();
myApp.use(passport.initialize());
myApp.use(passport.session());

myApp.use("/", viewRouter);
myApp.use("/users", usersViewRouter);
myApp.use("/api/sessions", sessionsRouter);

//Conexion a servidor
myApp.listen(PORT, () => {
    console.log("Servidro escuchando en el puerto " + PORT)
})

//MongoDB
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

//Creamos el server para sockets
//const socketServer = socketFunctions(httpServer)

//Usamos las rutas
routerApi(myApp);
import __dirname from "./utils.js";
import express from "express";
import handlebars from "express-handlebars"
import mongoose from 'mongoose';
import routerApi from "./routes/index.js";
import socketFunctions from "./services/app.service.js"

const PORT = 8080;
const myApp = express();

//Añado esto para poder usar los elementos publicos
myApp.use(express.static(__dirname + "/public"))

//Preparar la configuración del Server para recubir objetos JSON
myApp.use(express.json());
myApp.use(express.urlencoded({extended:true}));

//Handlebars
myApp.engine("handlebars", handlebars.engine());
myApp.set("views", __dirname + "/views");
myApp.set("view engine", "handlebars") //Nos permite usar el response.render()

//Conexion a servidor
const httpServer = myApp.listen(PORT, () => {
    console.log("Mi port:" + PORT)
})

//MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://PedroZaja:pedrozaja@pedrozaja.nsf6vel.mongodb.net/zaja-tecno?retryWrites=true&w=majority")
        console.log("Conectado a MongoDB via Mongoose");
    } catch (error) {
        console.error("No se pudo conectad a la BD usando Mongoose: " + error);
        process.exit();
    }
};

connectMongoDB();

//Creamos el server para sockets
const socketServer = socketFunctions(httpServer)

//Usamos las rutas
routerApi(myApp);
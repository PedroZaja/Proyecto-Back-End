import { loadMessages, saveMessage } from "./chats.service.js";

import ProductManager from "./../dao/filesystem/models/ProductManager.js";
import { Server } from "socket.io";

const pm = new ProductManager("./productos.json")
let socketFunctions = (httpServer) => {

    const socketServer = new Server(httpServer);
    socketServer.on("connection", socket => {
    // console.log("Cliente conectado");
    socket.emit("updateProductsRealTime",pm.getProducts())
    
    socket.on("createProduct", data => {
        let productCreated = pm.addProduct(data)
        socket.emit("createProductMessage",productCreated )
        socket.emit("updateProductsRealTime",pm.getProducts())
    })

    socket.on("updateProduct", data => {
        let messageUpdated = pm.updateProduct(parseInt(data.id), data.data)
        socket.emit("updateProductMessage",messageUpdated )
        socket.emit("updateProductsRealTime",pm.getProducts())
    })

    socket.on("deleteProduct", data => {
        let messageDeleted = pm.deleteProduct(data);
        socket.emit("deleteProductMessage",messageDeleted )
        socket.emit("updateProductsRealTime",pm.getProducts())
    })

    //Chats
    let loadChats = async () => {
        let messages = await loadMessages()
        socketServer.emit("loadChats", messages)
    }
    let saveChat = async (data) => {
        await saveMessage(data)
        loadChats()
    }
    socket.on("loadChats", () => {
        loadChats();

    })
    socket.on("saveChat", data => {
        saveChat(data);
    })

})
    return socketServer
}

export default socketFunctions
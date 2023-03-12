const socket = io();

const createProductButton = document.getElementById("createProduct");
const updateProductButton = document.getElementById("updateProduct");
const deleteProductButton = document.getElementById("deleteProduct");

socket.on("createProductMessage", data => {
    if (!data.id) {
        document.getElementById("message").innerHTML = data.message
    }
    else{
        document.getElementById("message").innerHTML = "Producto creado correctamente!"
    }
})

socket.on("updateProductMessage", data => {
        document.getElementById("message").innerHTML = data.message
})

socket.on("deleteProductMessage", data => {
        document.getElementById("message").innerHTML = data.message
})


createProductButton.onclick = () => {
    let data = getFormData();
    socket.emit("createProduct",data);
}
updateProductButton.onclick = () => {
    let data = getFormData();
    let id = document.getElementById("productId").value;
    if (id.lenght >= 0) {
        document.getElementById("message").innerHTML = "No puede estar el ID vacio"
    }else{

        socket.emit("updateProduct",{id, data});
    }
}
deleteProductButton.onclick = () => {
    let id = document.getElementById("productId").value;
    if (id.lenght >= 0) {
        document.getElementById("message").innerHTML = "No puede estar el ID vacio"
    }else{
        socket.emit("deleteProduct",id);    
    }
}

function getFormData(){
    let titulo = document.getElementById("titulo").value;
    let descripcion = document.getElementById("descripcion").value;
    let code = document.getElementById("code").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);
    let img = document.getElementById("img").value.split(",");

    return {titulo,descripcion,code,precio,status: true,stock,img}
}

const socket = io();

socket.on("updateProductsRealTime", data => {
    let products = data;
    let productList = document.getElementById("productRealTimeList");
    productList.innerHTML = ""
    products.forEach(product => {
        productList.innerHTML += `
        <div class="productRealTimeItem"> 
            <p>Titulo: ${product.titulo}</p>
            <p>Descripción: ${product.descripcion}</p>
            <p>Codigo: ${product.code}</p>
            <p>Precio: ${product.precio}</p>
            <p>Stock: ${product.stock} </p>
            <p>Imagenes: ${product.img} </p>
        </div>
        `
    });

})
import Product from "./classes/Product.js"
import fs from "fs"

class ProductManager{
    
    constructor(path){
        this.path = [path];
        this.products = [];
        if(!fs.existsSync(this.path.toString())){
            fs.writeFileSync(this.path.toString(),JSON.stringify(this.products))
        }

    }

    productValidation(data){
         //Validaciones
         let errorMessage = "";
         if(!data.title || data.title.toString().length <= 0){
            return errorMessage+= "El titulo no puede estar vacio"
         }
         if(!data.description || data.description.toString().length <= 0){
            return errorMessage+= "La descripción no puede estar vacia"
         }
         if(!data.code || data.code.toString().length <= 0){
            return errorMessage+= "El codigo no puede estar vacio"
         }
         if(!data.price || !Number.isFinite(data.price) || data.price <= 0 ){
            return errorMessage+= "El precio no es válido"
         }
         if(!data.status || (data.status !== true || !data.status !== false)){
            return errorMessage+= "El status no es válido"
         }
         if(!data.stock || !Number.isFinite(data.stock) || data.price < 0 ){
            return errorMessage+= "El stock no es válido"
         }
         if(!data.description || data.description.toString().length <= 0){
            return errorMessage+= "La description no puede estar vacia"
         }
         if(!data.thumbnails || !Array.isArray(data.thumbnails)){
            return errorMessage+= "Las img no son validos"
         }
         
         return errorMessage;
    }

    getProducts(){
        let productsJSON = fs.readFileSync(this.path.toString(),'utf-8');
        return JSON.parse(productsJSON);
    }

    getProductsById(id){
        this.products = JSON.parse(fs.readFileSync(this.path.toString(),'utf-8'));
        
        for (let i = 0; i < this.products.length; i++) {
            
            if (this.products[i].id === id) {
                return this.products[i]
            }
            
        }

        return {message: "Error, producto no encontrado"}
    }

    addProduct(data){

        let errorMessage = this.productValidation(data)
        
        //Valido datos
        if (errorMessage !== "") {
            return {message: "Error: " + errorMessage}
        }
        this.products = this.getProducts();
  
        if ( this.products.filter(prod=>  prod.code === data.code).length>0){ return {message: "Error: Codigo repetido" }}
        let newId = 1;
        
        //Añado nuevo ID
        if (this.products.length > 0) {
            newId = this.products[this.products.length - 1].id + 1
        }
        let auxProduct = new Product(data.titulo,data.descripcion,data.precio,data.img,data.stock,data.code,data.status)
        let newProduct = {
            id: newId,
            ...auxProduct
            
        } 
            
        this.products.push(newProduct);
        fs.writeFileSync(this.path.toString(), JSON.stringify(this.products));

        return newProduct;      
    }
    
    updateProduct(id,data){

        this.products = this.getProducts();
        if (!id || id <= 0) { return {message: "Error Id no valido" }}     
        if (this.products.filter(prod=> prod.id === id).length <= 0) { return {message: "Error no existe producto con ese ID" } } 

        if (this.products.filter(prod=> prod.code === data.code && prod.id !== id).length>0)
        {return {message: "Error Codigo repetido" }}

        this.products = JSON.parse(fs.readFileSync(this.path.toString(),'utf-8'));

        //Actualizo producto
        let updatedProducts = this.products.map(
                (oneProduct) => {
                    if (oneProduct.id == id){
                        oneProduct = {id,...oneProduct,...data}
                    }
                    return oneProduct
                }
            )
        fs.writeFileSync(this.path.toString(), JSON.stringify(updatedProducts));
        return {message: `Producto ${id} actualizado` }
        
    }

    deleteProduct(id){
        this.products = JSON.parse(fs.readFileSync(this.path.toString(),'utf-8'));
        let updatedProducts = this.products.filter(oneProduct => oneProduct.id != id);
        if (updatedProducts.length == this.products.length) {
            return "No se encontró el producto a eliminar"
        }else{
            fs.writeFileSync(this.path.toString(), JSON.stringify(updatedProducts));
            return {message: `Producto ${id} eliminado`}
        }

    }
}

export default ProductManager
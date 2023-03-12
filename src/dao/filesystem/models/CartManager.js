import Cart from "./classes/Cart.js"
import ProductManager from "./ProductManager.js"
import fs from "fs"

class CartManager{
    constructor(path){
        this.path = [path];
        this.carts = [];
        if(!fs.existsSync(this.path.toString())){
            fs.writeFileSync(this.path.toString(),JSON.stringify(this.carts))
        }

    }

    getCarts(){
        let cartsJSON = fs.readFileSync(this.path.toString(),'utf-8');
        return JSON.parse(cartsJSON);
    }

    getCartById(id){

        this.carts = this.getCarts();

        for (let i = 0; i < this.carts.length; i++) {
            
            if (this.carts[i].id === id) {
                return this.carts[i]
            }
            
        }

        return {message: "Error, carrito no encontrado"}
    }

    addCart(){
        this.carts = this.getCarts();
        let newId = 1;
        if (this.carts.length > 0) {
            newId = this.carts[this.carts.length - 1].id + 1
        }
        let auxCart = new Cart();
        let newCart = {
            id: newId,
            ...auxCart
        }
        this.carts.push(newCart);
        fs.writeFileSync(this.path.toString(), JSON.stringify(this.carts));
        
        return newCart
    }

    addProductToCart(idCart, idProduct){
        //Compruebo si existe el carrito
        let cart = this.getCartById(idCart);
        if (!cart.id) {
            return cart;
        }

        let newPM = new ProductManager("./productos.json");
        let quantity = 1;
        let productsExist = cart.products.filter(oneProd => oneProd.id === idProduct) 
        let updateProducts = [];
        let updatedCart = [];
        let updatedCarts = [];
        //Compruebo si existe el producto
        let newProduct = newPM.getProductsById(idProduct);
        if (!newProduct.id) {
            return newProduct;
        }

        if (cart.products.length == 0 || productsExist.length == 0) {
            cart.products.push({id: idProduct, quantity: quantity})
            updatedCart = {...cart}
        }
        
        if (productsExist.length > 0) {
            quantity = productsExist[0].quantity + 1;
            
            updateProducts = cart.products.map(
            (oneProd) => {
                if (oneProd.id === idProduct){
                    oneProd = {id: idProduct,quantity}
                }  
                return oneProd
            }
            )
            updatedCart = {...cart, products: updateProducts}
        }
        
        updatedCarts = this.carts.map(
            (oneCart) => {
                if (oneCart.id == idCart){
                    oneCart = {...oneCart,...updatedCart}
                }
                return oneCart
            }
        )
        
        fs.writeFileSync(this.path.toString(), JSON.stringify(updatedCarts));

        return updatedCart;        
        
    }

}

export default CartManager
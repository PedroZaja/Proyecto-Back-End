class Product{
 
    constructor(titulo, descripcion, precio, img, stock, code, status){
        this.titulo = String(titulo) || "";
        this.descripcion = String(descripcion) || "";
        this.precio = parseInt(precio) || 0;
        this.img = img || [];
        this.stock = parseInt(stock) || 0;
        this.code = String(code) ;
        this.status = status || true;
        
    }
}

export default Product;
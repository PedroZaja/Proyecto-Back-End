import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";


const productCollection = "products"

const stringRequired = {type:String, required: true};
const numberRequired = {type:Number, required: true};

const productSchema = new mongoose.Schema({

    titulo: stringRequired,
    descripcion: stringRequired,
    precio: numberRequired,
    img: {type:Array,required: false},
    stock: numberRequired,
    code: {type:String, unique: true, required: true},
    status: {type:Boolean,required: false} || true
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema)
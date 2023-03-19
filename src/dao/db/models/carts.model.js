import mongoose from 'mongoose';

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({

    // products: {type: Array, required: false || []}
    products: {
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {type: Number}
            }
        ],
        default: []
    }

});
cartsSchema.pre('findById', function(){
    this.populate("products.product")
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)
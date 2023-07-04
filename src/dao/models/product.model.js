//estructura del documento que se guardara
//esquema
//schema
import mongoose from "mongoose"

const productCollection ='product'

const productSchema = new mongoose.Schema({
    id:Number,
    idproduct:mongoose.ObjectId,
    description: {type: String, required:true},
    code: {type: String, required:true,unique:true},
    title: {type: String, required:true},
    status:{type:Boolean, default:true},
    stock: {type: Number, required:true},
    category: {type: String, required:true},
    thumbnails: {type: [String],default:[]},
    price: {type: Number, required:true}

})

export const productModel =mongoose.model(productCollection,productSchema)
import mongoose from "mongoose"; 
import MongoDBContainer from "./MongoDBContainer.js";

const collection = 'products';

const productsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price:{
        type:Number,
        require: true
    },
    thumbnail: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Date,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    stock: Number,
    description: {
        type: String,
        default: ""
    }
}, {timestamps: true});

export default class Products extends MongoDBContainer {
    constructor() {
        super(collection, productsSchema);
    }
}
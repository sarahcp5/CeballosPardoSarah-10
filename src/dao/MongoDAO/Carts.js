import mongoose from "mongoose"; 
import MongoDBContainer from "./MongoDBContainer.js";

const collection = 'carts';

const productsSchema = mongoose.Schema({
    products: {
        type: [],
        default: []
    }
}, {timestamps: true});

export default class Carts extends MongoDBContainer {
    constructor() {
        super(collection, productsSchema);
    }
}
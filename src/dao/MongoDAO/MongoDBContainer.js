import mongoose from "mongoose";

export default class MongoDBContainer {
    constructor(collection, schema){
        mongoose.connect('mongodb+srv://coderuser:coderuser@segundaentrega.s0vvnoj.mongodb.net/mongoAtlas?retryWrites=true&w=majority', err => {
            if(err) {
                console.log("Error al intertar de conectar con la DB Atlas.")
            }
            else {
                console.log("Conectado correctamente con la DB Atlas.")
            }
        });
        this.model = mongoose.model(collection, schema)
    }

    getAll = async() => {
        let results = await this.model.find();
        return results;
    }

    save = async(document) => {
        let results = await this.model.create(document);
        return results;
    }

    getById = async(numberId) => {
        let result = await this.model.find({"_id":numberId});
        return result.length != 0 ? result[0] : null;
    }

    deleteById = async(numberId) => {
        await this.model.deleteOne({"_id":numberId});
    }

    deleteAll = async() => {
        await this.model.deleteMany({});
    }

    updateById = async(numberId, object) => {
        let results = await this.model.updateOne({"_id":numberId},{$set:object});
        return object        
    }

    isExist = async(code) => {
        let results = await this.model.find({"code":code});
        return results.length != 0 ? true : false;
    }

    deleteProductById = async(numberIdCart, numberIdProduct)=> {   
        await this.model.updateOne({"_id":numberIdCart},{$pull:{"products":{"_id":numberIdProduct}}});
    }

    saveProductById = async(numberIdCart, numberIdProduct) => {
        let result = await this.getById(numberIdCart)
        if(result.products.length != 0){
            let product =  result.products.filter((object) => {
                return object._id == numberIdProduct;
            });

            if(product.length != 0){
                let quantity = product[0].quantity + 1;
                let res1 = await this.model.updateOne({"_id":numberIdCart, "products._id":numberIdProduct},{$set:{"products.$.quantity": quantity}});
            }    
            else {
                let res2 = await this.model.updateOne({"_id":numberIdCart},{$push:{"products": {"_id":numberIdProduct, "quantity": 1}}});
            }
        }
        else {
            let res2 = await this.model.updateOne({"_id":numberIdCart},{$addToSet:{"products": {"_id":numberIdProduct, "quantity": 1}}});
        }
    }

    getProductsById = async(numberId, productsList) => {
        let result = await this.model.find({"_id":numberId}, { "products": 1, "_id": 0 });
        if(result[0].products.length != 0){
            let p =  result[0].products.map((pCart) => {
                let productIndex = productsList.filter((object) => {
                    return object.id == pCart._id;
                });
                if(productIndex.length != 0){
                    productIndex[0].quantity = pCart.quantity;
                    return productIndex[0];
                }
            })

            return p;
        }

        return result[0].products;    
    }

}


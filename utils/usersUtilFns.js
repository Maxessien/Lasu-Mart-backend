import fs from "fs"
import path from "path"
import multer from "multer";
import { Product } from "../models/productsModel.js";

export const upload = multer({ dest: "uploads" });

export const cleanUpStorage = ()=>{
    try {
        const relPath = path.join(__dirname, "uploads")
        fs.unlinkSync(relPath)
    } catch (err) {
        console.log(err)
        return err
    }
}

export const populateUserCart = async(userCart)=>{
    try {
        console.log(userCart)
        if(!userCart || userCart?.length <= 0) return []
        const productsId = userCart.map((cartItem)=>cartItem.productId)
        const products = await Product.find({productId: {$in: productsId}}).lean()
        if (!products || products?.length <= 0) return []
        const productsMap = new Map(products.map((product)=>[product.productId, product]))
        const newUserCart = userCart.map((cartItem)=>{
            const productObj = productsMap.get(cartItem.productId)
            if (productObj){
                return {...cartItem, ...productObj}
            }
        })
        return newUserCart
    } catch (err) {
        console.log(err)
        throw err
    }
}
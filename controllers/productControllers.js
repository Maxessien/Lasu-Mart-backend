import { Product } from "../models/productsModel.js"


const getProducts = async(req, res)=>{
    try {
        const {page, limit} = req.params
        const products = await Product.find().limit(20).skip(page-1).sort([["createdAt", "desc"]]).lean()
        console.log(products)
        return res.status(202).json(products)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

const getTrendingProducts = async(req, res)=>{
    try {
        const trendingProducts = await Product.find().sort([["ratings", "desc"]]).limit(6).lean()
        console.log(trendingProducts, "trdprod")
        return res.status(202).json(trendingProducts)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

export {getProducts, getTrendingProducts}
import { Category } from "../models/categoriesModel.js"

const getCategories = async(req, res)=>{
    try {
        const categories = await Category.find().select({name: 1}).lean()
        console.log(categories)
        res.status(202).json(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const addCategory = async(req, res)=>{
    try {
        await Category.insertOne({name: req.body.newCategory})
        return res.status(201).json({message: "Categroy added successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const deleteCategory = async(req, res)=>{
    try {
        await Category.deleteOne({name: req.body.category})
        return res.status(201).json({message: "Categroy deleted successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export {getCategories, addCategory, deleteCategory}
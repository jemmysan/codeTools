import mongoose from "mongoose";
import Joi from "joi"
import { Category } from "../models/category.model.js";
import { Book } from "../models/books.model.js";

// Get all Categories
const index = async (req, res)=>{
    try {
        const category = await Category.find();
        return res.status(200).json({
            success : true,
            categories : category
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }
}


// Store a new Category
const store = async (req, res)=>{
    const {libelle} = req.body
    const validator = Joi.object({
        libelle : Joi.string().min(3).max(50).required()
    })
    try {
        const {error, value } = validator.validate({libelle})

        if(error) return res.status(401).json({success : false, message : error.details[0].message})
        
        const categoryExists = await Category.findOne({libelle : value.libelle});

        if(categoryExists) return res.status(400).json({message : 'Category already exists'});

        const newCategory = await Category.create({libelle});
        
        return res.status(201).json({
            success : true,
            message : 'Category created successfully!',
            category : newCategory
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }

}

// Show one Category
const show = async (req, res)=> {
    const {id} = req.params;
    try {
        const category = await Category.findById(id);

        if(!category) return res.status(400).json({success: false, message : 'Id not found!'});

        return res.status(200).json({success: true , category : category});
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }

}


// Delete a Category
const destroy = async (req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({success : false, message : 'Invalid Id'});

    try {
        const categoryExists = await Category.findById(id);

        if(!categoryExists) return res.status(400).json({message : 'Category not found!'});

        await Book.updateMany({ category_id: id }, { $unset: { category_id: null } });

        await categoryExists.deleteOne();
        return res.status(200).json({message : 'Category deleted successfully!'});

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }
}


export { index, store, show, destroy }
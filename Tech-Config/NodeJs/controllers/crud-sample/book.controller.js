import { Book } from "../models/books.model.js";
import { bookValidator } from "../middlewares/book.validator.js";
import mongoose from "mongoose";

const index = async (req, res) => {
    try {
        const books = await Book.find().populate('category_id', 'libelle');
        return res.status(200).json({success : true, data : books})   
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }
}

const store = async (req, res) => {
    try {
        const {error, value} = bookValidator.validate(req.body)

        if (error) return res.status(401).json({success: false, message: error.details[0].message});

        const { title, author, description, published_year, category_id, stock } = value;

        if(category_id && !mongoose.Types.ObjectId.isValid(category_id)) {
            return res.status(400).json({success : false, message : 'Id not found'})
        }

        await Book.create({
            title, 
            author,
            description,
            published_year, 
            category_id : category_id || null, 
            stock 
        })
        return res.status(200).json({success : true, message : 'Book added succesfully!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }
    

}

const show = async (req, res) => {
    try {
        const {id} = req.params;

        const bookFounded = await Book.findById(id);

        if(!bookFounded) return res.status(400).json({success : false, message : 'Invalid Id'});
        
        return res.status(200).json({success : true, message : bookFounded});

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params
        const {error, value} = bookValidator.validate(req.body)

        if (error) return res.status(401).json({success: false, message: error.details[0].message});

        const { title, author, description, published_year, category_id, stock } = value;

        if(category_id && !mongoose.Types.ObjectId.isValid(category_id)) {
            return res.status(400).json({success : false, message : 'Category Id not found'})
        }

        const bookToUpdate = await Book.findById(id)
        
        if(!bookToUpdate) return res.status(400).json({message : 'Book not found!'});

       bookToUpdate.set({
            title, 
            author,
            description,
            published_year, 
            category_id : category_id || null, 
            stock 
        })

        await bookToUpdate.save();
        return res.status(200).json({success : true, message : 'Book updated succesfully!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }

}

const destroy = async (req, res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({success : false, message :'Not existing Id'})

    try {
        const book = await Book.findById(id)
        if(!book) return res.status(400).json({success: false, message: 'book not found !'});
        await book.deleteOne();
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'An internal error occured!'});
    }
}


export {
    index,
    store,
    show,
    update,
    destroy
}
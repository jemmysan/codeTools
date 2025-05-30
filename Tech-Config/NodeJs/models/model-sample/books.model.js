import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "The Title is required"],
    },
    author: {
        type: String
    },

    description: {
        type: String,
        minLength: [5, 'The description is required']
    },
    published_year: {
        type: Number,
        default : 0
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        default : null
    },

    stock: {
        type: Number,
        default : 0
    }
},
    {
        timestamps: true
    }
)


export const Book = mongoose.model('Book', BookSchema);


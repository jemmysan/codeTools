import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title : { type : String, required : true},
        decription : {type : String},
        createdBy : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true}
    },
    {
        timestamps : true
    }
)

export default Project = mongoose.model('Project', projectSchema)
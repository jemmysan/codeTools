import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        title : { type : String, required : true, },
        done : { type : Boolean, default : false },
        projectId : { type : mongoose.Schema.Types.ObjectId, ref : 'Project', required : true}
    },
    {
        timestamps : true
    }
)

export default Task = mongoose.Model('Task', taskSchema)
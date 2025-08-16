import 'dotenv'
import mongoose from "mongoose";

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(`MongoDB Connected to : ${conn.connection.host}`);
    }).catch((err) => {
      console.log(`Some error occured while connecting to database: ${err}`);
    });     
}

export default connectToDB;

import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Error connecting to MongoDB: ${err.message}`);
    // On arrête le serveur car l'app ne peut pas fonctionner sans DB
    process.exit(1); 
  }
};

export default connectToDB;
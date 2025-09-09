import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database connected'));
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

export default connectDB;

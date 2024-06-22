import mongoose from "mongoose";


async function initDatabase(){
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

export default initDatabase;

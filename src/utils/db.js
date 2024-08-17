
import mongoose from "mongoose";

const URI = "mongodb+srv://sranjay15:aaAA@9006@clustername.mongodb.net/databasename";

const connectDb = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDb;

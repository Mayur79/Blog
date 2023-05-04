import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const Connection = async () => {
    const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.ik7arv1.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(url, { useNewUrlParser: true });
        console.log("Database Connected successfully");
    }
    catch (error) {
        console.log("Error while connecting to database", error);
    }
}
export default Connection;
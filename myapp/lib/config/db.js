import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://muhammadtaha3713:08080808@cluster0.uvkjxgx.mongodb.net/blog-app")
    console.log("DB Connected");
}
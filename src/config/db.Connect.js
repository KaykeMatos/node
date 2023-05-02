import mongoose from "mongoose"

mongoose.connect("mongodb+srv://Kayke:dev123@alura.y7rfuff.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;
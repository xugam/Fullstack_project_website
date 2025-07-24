import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import  productRoutes  from "./routes/product.route.js";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.use(express.json());//allows to use json data in req.body

app.use("/api/products", productRoutes); // Use the product routes

//console.log(process.env.MONGO_URI);

app.listen(PORT,()=>{
    connectDB();
    console.log("Server started at http://localhost:" + PORT);  
});
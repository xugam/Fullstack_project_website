import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";


dotenv.config();

const app = express()

app.use(express.json());//allows to use json data in req.body

app.get("/",(req, res)=>{
    res.send("Server is ready");
});

app.get("/api/products",async (req, res)=>{
    try{
        const   product = await Product.find();
        res.send(product);
    }catch(error){
        console.error("Error in Getting Product:", error.message);
        res.status(404).json({success:false, message: "product not found"})
    }
});

app.get("/api/products/:id",async (req, res)=>{
    const {id} = req.params;
    try{
        const   product = await Product.find(id);
        res.send(product);
    }catch(error){ 
        console.error("Error in Getting Product:", error.message);
        res.status(404).json({success:false, message: "product not found"})
    }
});

app.post("/api/products", async (req, res)=>{
    const product = req.body;


    if(!product.name || !product.image || !product.price){
        return res.status(400).json({ success:false, message:"Please provide all info"})
    }

    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({ sucess:true, data: newProduct})
    }catch(error){
        console.error("Error in Create Product:", error.message);
        res.status(404).json({success:false, message: "Please fill all data "})
    }
});

app.delete("/api/products/:id", async (req, res)=>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess:true, message: id+" Product deleted"})
    }catch(error){
        console.error("Error in Delete Product:", error.message);
        res.status(404).json({success:false, message: "product not found"})
    }
})

//console.log(process.env.MONGO_URI);

app.listen(3000,()=>{
    connectDB();
    console.log("Server started at http://localhost:3000");  
});
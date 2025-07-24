import Product from "../models/product.model.js";
import mongoose from "mongoose";



export const getProducts = async (req, res)=>{
    try{
        const   products = await Product.find();
        res.json({success:true, data:products});
    }catch(error){
        console.error("Error in Fetching Product:", error.message);
        res.status(404).json({success:false, message: "product not found"})
    }
}

export const updateProduct = async (req, res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message:"Invalid Product ID"})
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{new:true});
        res.status(200).json({sucess:true, data: updatedProduct})
    }catch(error){
        console.error("Error in Update Product:", error.message);
        res.status(404).json({success:false, message: "product not found"})
    }
}

export const deleteProduct = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message:"Invalid Product ID"})
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess:true, message: id+" Product deleted"})
    }catch(error){
        console.error("Error in Delete Product:", error.message);
        res.status(5000).json({success:false, message: "Server error"})
    }
}

export const createProduct =  async (req, res)=>{
    const product = req.body;
    // Check if all required fields are present
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
}

export const findProduct = async (req, res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success:false, message:"Invalid Product ID"})
    }
    try{
        const  products = await Product.find(id);
        res.status(200).json({success:true, data: products})
        
    }catch(error){ 
        console.error("Error in Getting Product:", error.message);
        res.status(404).json({success:false, message: "Server Error"})
    }
}
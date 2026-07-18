import foodModel from "../models/foodModel.js";
import fs from "fs"

//add food item
const addFood = async (req,res)=>{         //to add food item on the database
    
    let image_filename=`${req.file.filename}`;

    const food = new foodModel({    //when we hit apiendpoint of this controller we send this data in body
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food items
const removeFood = async (req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})   //here we are passing filepath as an argument
        await foodModel.findByIdAndDelete(req.body.id)

        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}
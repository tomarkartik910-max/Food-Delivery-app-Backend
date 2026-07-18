import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://kartiktomar17:KartNith5217@cluster1.dl80k21.mongodb.net/Food-del-app').then(()=>console.log("DB Connected"))
}
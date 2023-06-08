import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = ()=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true})
    .then(()=>{
        console.log("Connection db is successfull")
    }).catch(err=>console.log(err));

}

export{ connectdb}
import mongoose from "mongoose";
const Schema = mongoose.Schema

const CommentsShema = new Schema({

    photos_id:{
        type:String,
        required:true
    },
    answer_id:{
        type:String,
        required:true,
    },
    answer_name:{
        type:String,
        required:true,
    },
    user_profile:{
type:String,
required:true,
    },
    user_name:{
type:String,
required:true,
    },
    user_id:{
        type:String,
        required:true,
    },
    comments:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now()
    }

})

export default mongoose.model("Comments",CommentsShema)
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PhotosShema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_name:{
 type:String,
 required:true
  },
  user_profile:{
    type:String,
    required:true
  },
  img_url: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  like: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

export default mongoose.model("Photos", PhotosShema);

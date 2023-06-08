import expressAsyncHandler from "express-async-handler";
import User from "../models/user.js";
import Photos from "../models/photos.js";
import { checkRegisterInput, comparePassword } from "../helpers/input/inputhelpers.js";
import CustomError from "../helpers/error/CustomError.js";
import { sendJwttoTocken } from "../helpers/authorization/tokenhelpers.js";
import user from "../models/user.js";

const LoginSecrutiy = [];

const Register = expressAsyncHandler( async(req,res,next)=>{

    const {email,name,password} = req.body;
     
  const user = await  User.create({
        email,
        name,
        password,
    })
      
    res.json({
        success:true,
        navigate:true
    })


})

const Login= expressAsyncHandler( async(req,res,next)=>{

  const  {email,password} = req.body;
  
 if( !(checkRegisterInput(email,password)) ){
    return next(new CustomError("IN4000",400))
 }
  
 const user = await User.findOne({email:email}).select("+password");
      
     if(!user){
        return next(new CustomError("KB4000",400))
     }

     if(user.online !== false){
      LoginSecrutiy.push({
        id:user.id,
        date:Date.now()
     });
    
      return next(new CustomError("DOA400",403));
   }
 if(!(comparePassword(password,user.password))){
    return next(new CustomError("OA4000",401))
 }
      
   sendJwttoTocken(user,res)
   user.online_cookie = Date.now();
   user.online = true;
  await user.save();

})
 const UserUpdateProfile =expressAsyncHandler(async (req,res,next) =>{
    
  const photos = await Photos.find({user_id:req.user.id});
  if(photos){
  for(let i=0; i<photos.length;i++){
    photos[i].user_profile = req.savedProfileImage;
    photos[i].save();
  }
}
    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile":req.savedProfileImage
    },{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        profile_img:user.profile,
    })


 });
 const UserInformationUpdate = expressAsyncHandler(async(req,res,next)=>{

          const {email,name,password} = req.body;
let oldEmail = "";
let oldName ="";

  const user = await User.findById(req.user.id);
  
  oldEmail = user.email;
  oldName = user.name;


  if(!email){
    user.email = oldEmail;
  }else{
    user.email = email;
  }
  if(!name){
    user.name = oldName;
  }else{
    user.name = name;
  }
  if(password){
user.password=password;
  }
user.save();
res.status(200).json({
    success:true,
    user_name:user.name,
    user_email:user.email,
})
 })
const offline = expressAsyncHandler(async(req,res,next)=>{

  if(!req.user){

  return next(new CustomError("OAH400",400));
  }
const {id} = req.user;

const user = await User.findById(id);

   user.online_cookie = (Date.now()+1000*60*50000);
   user.online = false;
 await  user.save();
   res.status(200).json({
    success:true,
    online:false
   })

  
  

});

const offlineOtomatic = expressAsyncHandler(async(req,res,next)=>{

 const  {user_id,user_email} = req.body;
 if(!user_id || !user_email){
    return next(new CustomError("EBG400",400));
 }
  const user = await User.findOne({_id:user_id,email:user_email});
  
  if(!user){
     return next(new CustomError("KB4000",400));
  }

  user.online=false;
  await user.save();
})
export {
    Register,
    Login,
    UserUpdateProfile,
    UserInformationUpdate,
    offline,
    offlineOtomatic,
    LoginSecrutiy
}
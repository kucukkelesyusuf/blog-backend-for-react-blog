import expressAsyncHandler from "express-async-handler";
import User from "../models/user.js";
const authControl =expressAsyncHandler(async(req,res,next)=>{

    const{id,security} = req.user;

   const user = await User.findById(id); 

   let date =new Date();
   user.online=true;
   user.online_date = date;
   await user.save();

    res.status(200).json({
        success:true,
        authenticate:true,
        security:security,
        user_id:id
    })
});


export{
    authControl
}
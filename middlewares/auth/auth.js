import jwt from "jsonwebtoken";
import { AuthorizationControlTokenFromHeader, isTockenIncluded } from "../../helpers/authorization/tokenhelpers.js";
import CustomError from "../../helpers/error/CustomError.js";
import { LoginSecrutiy } from "../../controllers/auth.js";



const AuthorizationControl = (req,res,next)=>{

    const {JWT_SECRET_KEY} = process.env;

    if(!isTockenIncluded(req)){
        return next(new CustomError("OGEAY4",401));
    }
   
const accessToken = AuthorizationControlTokenFromHeader(req);
let security = false;  
let logindate ; 
   jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
        return next(new CustomError("OGEAZG",401))
    }
    LoginSecrutiy.map((data,key)=>{
        if(data.id === decoded.id){
           security=true;
           logindate = data.date
            return;
        }
    })
    setTimeout(()=>{
    const result = LoginSecrutiy.filter(id=>id.id === decoded.id);
    
    const index = LoginSecrutiy.indexOf(result[0]);
   
    if (index > -1) { 
    LoginSecrutiy.splice(index, 1); 
    }
    
    return;
    },21000);
   
    req.user={
        id:decoded.id,
        name:decoded.name,
        security:{
            security:security,
            date:logindate
        }
    }
    next();
   })
 
    

}
export{
    AuthorizationControl
}
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const Schema = mongoose.Schema


const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"İsim gerekli alandır"],
        unique:true
    },
    profile:{
      type:String,
      default:"Default_user.jpg"
    },
    email:{
        type:String,
        required:[true,"Email gerekli alandır"],
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Plase provide a valid email"
        ]
    },

    password:{
        type:String,
        minlength:[6,"P006"],
        required:[true,"Şifre Gerekli Alanadır"],
        select:false
    },
    online:{
        type:Boolean,
        default:false
       },
       online_cookie:{
       type:Date,
       default:(Date.now()+1000*60*500)
       },
    online_date:{
         type:Date,
         default:Date.now()
     },
    follow:{
        type:Array
    },
    follows:{
        type:Array
    },
    createdAt:{
     type:Date,
     default:Date.now
    }

})


UserSchema.pre("save",function(next){
if(!this.isModified("password")){
   return  next();
}
bcrypt.genSalt(10,(err,salt)=>{
    if(err) next(err)
    bcrypt.hash(this.password,salt,(err,hash)=>{
        if(err) next(err)
        this.password=hash;
        next();
    })
})
})

UserSchema.methods.generateJwtFromUser = function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env;
    const payload ={
        id:this.id,
        name:this.name,
    }
    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    })
    return token
}

export default mongoose.model("User",UserSchema)
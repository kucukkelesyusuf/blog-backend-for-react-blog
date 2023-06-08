import expressAsyncHandler from "express-async-handler";
import User from "../../models/user.js";

class Ai{
    constructor(id,date,online){
     this.id=id;
     this.date=date;
     this.online=online;
    }
}

const OnlineControl =expressAsyncHandler(async()=>{

    
const user = await User.find();

if(user.length > 0){
user.map(async(data)=>{
    
    let ai = new Ai(data._id,data.online_date,data.online);

     let now =  new Date();
  
if((now.getMinutes() - ai.date.getMinutes()) > 1 || ( (now.getHours() - ai.date.getHours()) >2 && (now.getUTCDay() - ai.date.getUTCDay() ) >=0  )){
    
   
    const user = await User.findById(ai.id);
    user.online=false;
    await user.save();
}

})
}




});

export{
    OnlineControl
}
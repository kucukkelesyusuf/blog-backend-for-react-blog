import CustomError from "../../helpers/error/CustomError.js";

const CustomErrorHandler =(err,req,res,next)=>{
    let customError = err;
    let errCode =[];
    if(err.name === "ValidationError"){
        
        if(err.errors.name){ //N400
          errCode.push("N40000");
        }
        if(err.errors.email){ //E400
            errCode.push("E40000"); 
        }
        if(err.errors.password){ //P400
            if(err.errors.password.message === "P006"){
                errCode.push("P00600")
            }
            else{
            errCode.push("P40000");
        }
        }
   
         customError = new CustomError(errCode,400)
    }
    if(err.code === 11000){
        customError = new CustomError("VDE400",400)
    }
       console.log(err);
    console.log(customError.name,customError.message,customError.status);
    res.status(customError.status || 500)
    .json({
        success:false,
        message:customError.message,
    })

}

export { 
    CustomErrorHandler
}
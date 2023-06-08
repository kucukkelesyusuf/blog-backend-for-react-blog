import multer from "multer";
import path from "path";
import CustomError from "../../helpers/error/CustomError.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(file)
        const rootDir = __dirname;
        cb(null,path.join(".","/public/posted"));
    },filename:function(req,file,cb){
       
        const extension = file.mimetype.split("/")[1];
        req.savedPost = "postedPhotos_"+req.user.id+Date.now().toString()+"."+extension;
        console.log(req.savedPost);
        cb(null,req.savedPost);
    }
});

const fileFilter = (req,file,cb) =>{
    
    let allowedMimeTypes = ["image/jpg","image/gif","image/jpeg","image/png"]

    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb (new CustomError("DDD400",400),false)
    }else{
        return cb(null,true);
    }
}

const PostPhotos = multer({storage:storage,fileFilter:fileFilter});

export {PostPhotos}
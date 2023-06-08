import expressAsyncHandler from "express-async-handler";
import Photos from "../models/photos.js";
import CustomError from "../helpers/error/CustomError.js";
import User from "../models/user.js";
import CommentsPhoto from "../models/comments.js";


const GetAllPhotos = expressAsyncHandler(async(req,res,next)=>{

    const photos =await Photos.find().sort({createdAt:-1});

    res.status(200).json({
        photos:photos
    })


})


const PhotoPost = expressAsyncHandler(async(req,res,next)=>{
   const {id,name} = req.user;
   const {comment,email,method,photos_id} = req.body;
   
   let photos;
  if(!method){
        return next(new CustomError("MEB400",400));
    }

   if(photos_id){
   photos = await Photos.findById(photos_id);
   if(!photos){
    return next(new CustomError("GIY400",400))
   }

   }
   
    const user = await User.findById(id);
  
    if(email !== user.email){
     return next(new CustomError("FEG403",403))
    }
    if(method === "delete"){
      await  photos.deleteOne();
      return
    }
   if(!comment && !req.savedPost){
    return next(new CustomError("GB4000",400));
   }
   if(method === "post"){
   photos = await Photos.create({
    user_id:id,
    img_url:req.savedPost,
    comment,
    user_name:name,
    user_profile:user.profile,
    email
   })
} 
if(method === "put"){
    if(!req.savedPost && !comment){
        return next(new CustomError("BBG400",400));
    }
    if(req.savedPost){
    photos.img_url = req.savedPost;
    }
if(comment){
    
 photos.comment = comment;
}
   
  await  photos.save();
}
   
    res.status(201).json({
        success:true,
        navigate:true,
    })   


})


const like = expressAsyncHandler(async(req,res,next)=>{

      const {id} = req.user;
       const {photos_id} = req.body;
       
      const photos = await Photos.findById(photos_id);
      if(!photos){
        return next(new CustomError("BGY400",400))
      } 
     if(photos.like.indexOf(id) > -1){
        return 
     }
      photos.like.push(id);
      photos.save();
      res.status(200).json({
        success:true,
      })

})

const undoLike = expressAsyncHandler(async(req,res,next)=>{
    const {id} = req.user;
    const {photos_id} = req.body;
    const photos = await Photos.findById(photos_id);
    if(!photos){
      return next(new CustomError("BGY400",400))
    } 

    const index = photos.like.indexOf(id);
if (index > -1) { 
  photos.like.splice(index, 1);
  await photos.save(); 
}else{
    return
}
res.status(200).json({
    success:true,
  })
}) 

const getComments = expressAsyncHandler(async(req,res,next)=>{

  
  const {photo_id} = req.params;

  const commentsPhoto = await CommentsPhoto.find({photo_id});

  if(!commentsPhoto){
    return next(new CustomError("BGY400",400));
  }
  if(commentsPhoto.length === 0){
    return next(new CustomError("BYY",200));
  }
  res.status(200).json({
success:true,
data:commentsPhoto
  })
})

const Comments = expressAsyncHandler(async(req,res,next)=>{
  const {id} = req.user;
  const {photos_id} = req.params;
  let {comments,answer_id} = req.body;
  const user =await User.findById(id);
    
  if(!comments || !answer_id ){
    return next(new CustomError("HBG400",400));
  }
  const answer = await User.findById(answer_id);
   if(!answer){
    return next(new CustomError("HKG400",400))
   }

  const photos = await Photos.findById(photos_id);
  if(!photos){
    return next(new CustomError("GB4000",400));
  }
  const commentsPhoto =await CommentsPhoto.create({
    photos_id,
    answer_id,
    answer_name:answer.name,
    user_name:user.name,
    user_profile:user.profile,
    user_id:id,
    comments
  })

  photos.comments.push(commentsPhoto._id);
  await photos.save();
  res.status(200).json({
    success:true,
    comments:commentsPhoto
  })

});


export{
  Comments,
  getComments,
    GetAllPhotos,
    PhotoPost,
    like,
    undoLike
}
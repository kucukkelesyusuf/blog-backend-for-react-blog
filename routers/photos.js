import express from "express";
import { GetAllPhotos, PhotoPost,like,undoLike,Comments,getComments } from "../controllers/photos.js";
import { AuthorizationControl } from "../middlewares/auth/auth.js";
import { PostPhotos } from "../middlewares/libraries/PostPhotos.js";


const router = express.Router({});

router.get("/all",GetAllPhotos);
router.post("/create",[AuthorizationControl,PostPhotos.single("post_img")],PhotoPost);
router.post("/liked",AuthorizationControl,like);
router.post("/undolike",AuthorizationControl,undoLike);
router.post("/comments/:photos_id",AuthorizationControl,Comments);
router.get("/comments/:photos_id",getComments);
export default router
import express from "express"
import {connectdb} from "../helpers/database/db.js";
import auth from "./auth.js"
import users from "./users.js"
import photos from "./photos.js"
import { OnlineControl } from "../middlewares/libraries/OnlineAi.js";
const router = express.Router();


setInterval(()=>{
    
    OnlineControl();
},3500)

connectdb();

router.use("/auth",auth)
router.use("/users",users);
router.use("/photos",photos)
// router.use("/photos")

export default router
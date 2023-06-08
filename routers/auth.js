import express from "express"
import { Login, Register, UserInformationUpdate, UserUpdateProfile,offline,offlineOtomatic } from "../controllers/auth.js";
import { AuthorizationControl } from "../middlewares/auth/auth.js";
import { profileImageUpload } from "../middlewares/libraries/profileImageUpload.js";

const router = express.Router();

router.post("/login",Login);
router.get("/offline",AuthorizationControl,offline);
router.post("/offline/otomatic",offlineOtomatic)
router.post("/register",Register)
router.post("/profile",[AuthorizationControl,profileImageUpload.single("profile_image")],UserUpdateProfile);
router.post("/information/update",AuthorizationControl,UserInformationUpdate);
export default router
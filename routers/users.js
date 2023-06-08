import express from "express"
import { authControl } from "../controllers/users.js";
import { AuthorizationControl } from "../middlewares/auth/auth.js";
const router = express.Router();

router.get("/authorization/control",AuthorizationControl,authControl)


export default router
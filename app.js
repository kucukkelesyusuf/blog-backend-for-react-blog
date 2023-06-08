import express from "express"
import cors from "cors"
import dotnenv from "dotenv"
import { CustomErrorHandler } from "./middlewares/errors/customErrorHandler.js";
import router from "./routers/index.js";
import { dirname } from 'path';
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotnenv.config();
const app = express()
const {PORT} = process.env
app.use(cors());

app.use(express.json());

app.use("/",router);

app.use(express.static(path.join(__dirname,"public")));

app.use(CustomErrorHandler)

app.listen(PORT,()=>{
 console.log("Server is Running on port http://localhost:5000")   
})

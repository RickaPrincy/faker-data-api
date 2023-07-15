import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./router.js";

const app = express();
dotenv.config()
const port = process.env.SERVER_PORT;
/*-----------------------------------------------*/
app.use(json());
app.use(cors());
app.use("/file",express.static("file"));
app.use(router);

/*-----------------------------------------------*/
app.listen(port, ()=> console.log(`app listening on port : ${port}`));

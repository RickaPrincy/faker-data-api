import express, { json } from "express";
import cors from "cors";
import fs from "fs";
import generate from "./src/generate.js";

const app = express();
const port = 5000;


/*-----------------------------------------------*/
app.use(json());
app.use(cors());
app.use("/file",express.static("file"));

/*-----------------------------------------------*/
app.post("/",(req,res)=>{
    let path = generate(req.body);
    res.send({url : "http://localhost:5000/file/" + path});
});

app.delete("/:fileName",(req,res)=>{
    if(fs.existsSync("./file/" + req.params.fileName))
        fs.unlink("./file/" + req.params.fileName,(error)=>{
            if(error) console.log(error);
        });
    
    let message = { message : "File : " + req.params.fileName + " deleted" }
    res.send(message);
});


/*-----------------------------------------------*/
app.listen(port, ()=> console.log("app listenin on port " + port + " !"));

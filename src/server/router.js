import { Router } from "express";
import generate from "../logic/generate.js";

export let router = Router();

/*-----------------------------------------------*/
router.post("/",(req,res)=>{
    let path = generate(req.body);
    res.send({url : "http://localhost:5000/file/" + path});
});


router.get("/types",(req,res)=>{
    let path = generate(req.body);
    res.send({url : "http://localhost:5000/file/" + path});
});

//for the feature
router.delete("/:fileName",(req,res)=>{
    if(fs.existsSync("./file/" + req.params.fileName))
        fs.unlink("./file/" + req.params.fileName,(error)=>{
            if(error) console.log(error);
        });
    
    let message = { message : "File : " + req.params.fileName + " deleted" }
    res.send(message);
});


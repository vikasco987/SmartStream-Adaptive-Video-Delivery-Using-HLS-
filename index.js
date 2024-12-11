import express from "express"
 import cors from "cors"
 import multer from "multer"
 import { v4 as uuidv4 } from "uuid"

 const app = express() 

 app.use(
    cors({
        origin: ["http://localhost:3000","http://localhost:5173"],
        credentials: true
    })
 )

 app.use((req,res,next) => {
    res.header("Access-Cotrol-Allow-origin","*")//watch it
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requestes-With, Contesnt-Type, Accept"
    );
    next()
 })

app.use(express.json())
app.use(express.urlencoded({extended: true}))
 app.use("/uploads",express.static("uploads"))

app.get('/',function(req,res){
    res.json({message:"Hello chai aur code"})
})

app.listen(8000,function(){
    console.log("App is listening at port 8000..... ")
})


require('dotenv').config()
const express=require("express")
const { userRouter } = require("./routes/routes")
const {connection}=require("./config/db")
const { authenticate } = require('./middleware/authenticat')
const { noteRouter } = require('./routes/note')
var cors = require('cors')
const app=express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))
//https://careful-shrug-cod.cyclic.app
app.use("/fwt",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)
app.listen(process.env.port,async()=>{
    try{
        await connection
    console.log("server connected to DB")

    }catch(e){
        console.log(e.message)
    }
    console.log("server running")
})
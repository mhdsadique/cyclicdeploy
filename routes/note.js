
const express=require("express")
const {noteModel}=require("../model/note.model")
const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes=await noteModel.find()
    res.send(notes)
})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{

        const note=new noteModel(payload)
        await note.save()
        res.send({"msg":"Note Created"})
    }catch(e){

        res.send({"msg":"Note canot Create","err":e.message})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{

    const noteId=req.params.id
    try{

        await noteModel.findByIdAndDelete({_id:noteId})
        res.send({"msg":"id has been deleted"})
    }catch(e){
        res.send({"msg":"id has been deleted","err":e.message})
    }
})

module.exports={noteRouter}


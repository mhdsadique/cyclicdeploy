

const mongoose=require("mongoose")
const noteSchema=mongoose.Schema({
    title:{type:String,require:true},
    note:{type:String,require:true},
    category:{type:String,require:true},
    user:{type:String,require:true},
},{
    versionKey:false
})
const noteModel=mongoose.model("note",noteSchema)

module.exports={
    noteModel
}

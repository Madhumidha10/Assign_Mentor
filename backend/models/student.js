//import the mongoose 
const mongoose=require("mongoose")

//model schema for student

const studentSchema=mongoose.Schema({
    name:{type:String,},
    email:{type:String,},
    contact:{type:String,},
    mentor_status:{type:String}
})
//mongoose to assign collection name students
const studentModel=mongoose.model("students",studentSchema);
//export the student model
module.exports=studentModel;
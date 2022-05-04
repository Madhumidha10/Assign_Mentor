//import mongoose packages
const mongoose=require("mongoose")

//model schema for mentor

const mentorSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    contact:{type:String}, 
    Assigned_students:{type:Array}

})
//mongoose to assign collection name is mentors
const mentorModel=mongoose.model("mentors",mentorSchema);
//export the mentor model
module.exports=mentorModel;
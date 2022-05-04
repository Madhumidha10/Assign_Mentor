//import student & mentor models

const studentModel =require('../models/student')
const mentorModel =require('../models/mentor');

//Get students based on Mentor id
const getStudentsByMentor=async(req,res)=>{
    try {
        //find mentor by id
        const mentor=await mentorModel.findById(req.params.id);
        if(mentor)
        {
        res.send(mentor)//success to send mentor ifo
        }
          
     }
    catch (error) {
        console.log(error)
    }
}
//Get All the Student Info
const getStudents=async(req, res) => {
    try {
        //find all the students
        const students=await studentModel.find({});
        if(students){
            res.json(students)//success to send students info
        }
    } catch (error) {
        console.log(error)
    }
}
//Get Student based on id
const getStudentById=async(req, res) => {
    try {
        //find student by id
       const student=await studentModel.findById(req.params.id);
       if(student){
           res.json(student)
       }
    } catch (error) {
        console.log(error)
    }
}
//List Student Mentor should not be assigned
const getMNAStudents=async(req, res) => {
    try {
        //find mentor not assigned status
        const students=await studentModel.find({'mentor_status':'N'});
    if(students){
        res.json(students)//success to send students info
    }
    } catch (error) {
        console.log(error)
    }
}
//Create a new Student
const createStudent=async(req, res) => {
    try {
        //create a new student based on request
        const newstudent=new studentModel({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            mentor_status:req.body.mentor_status
        })
        //insert new student data to the DB
     const createStudent=await newstudent.save();   
     if(createStudent)
     {
         res.send("Created Successfully");//success to send Msg
     }
    } catch (error) {
        console.log(error)
    }
}
//Get All the Mentor info
const getMentors=async(req, res) => {
    try {
        //find all the mentors
        const mentors=await mentorModel.find({});
    if(mentors){
        res.json(mentors)//success to send mentor info
    }
    } catch (error) {
        console.log(error)
    }
}
//Create a new Mentor Info
const createMentor=async(req, res) => {
    try {
        //Create a new mentor based on request
        const newMentor=new mentorModel({
    name:req.body.name,
    email:req.body.email,
    contact:req.body.contact, 
    Assigned_students:req.body.Assigned_students
        })
        //insert a new mentor info to DB
     const createMentor=await newMentor.save();   
     if(createMentor)
     {
         res.send("Created Successfully");//success to send Msg
     }
    } catch (error) {
        console.log(error)
    }
}
const updateStudent=async(req,res)=>{
    try {
         //update student info to the DB based on ID
          const student=await studentModel.findByIdAndUpdate(req.params.id,req.body)
          if(student)
          {
              res.send("update successfully")//success to send Msg
          }
          
    } catch (error) {
        console.log(error)
    }
}

const assignMentor=async(req,res)=>{
    try {
        //update mentor info to the DB based on ID
          const mentor=await mentorModel.findByIdAndUpdate(req.params.id,req.body)
          if(mentor)
          {
            res.send("Update Successfully")//success to send Msg
          }
          
    } catch (error) {
        console.log(error)
    }
}

//exports the functions
 module.exports={getStudents,createStudent,getMentors,createMentor,getMNAStudents,assignMentor,updateStudent,getStudentsByMentor,getStudentById}
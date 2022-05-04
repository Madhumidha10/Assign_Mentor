//importing required packages and modules
const express = require('express')
const {getStudents,createStudent,getMentors,getStudentById,getStudentsByMentor,createMentor,getMNAStudents,assignMentor,updateStudent}=require('../controllers/functions')
const router = express.Router();


 //API to Create Mentor
router.route('/createMentor').post(createMentor);
 //API to Create Student
router.route('/createStudent').post(createStudent);

//API to get mentor not assigned student
router.route('/getMNAStudents').get(getMNAStudents);
//API to assign a student to mentor
router.route('/assignMentor/:id').put(assignMentor);
//API for update mentor assisgned status
router.route('/updateStudent/:id').put(updateStudent);



// //API to show all students for a particular mentor
 router.route('/getMentorById/:id').get(getStudentsByMentor);
// API to get student by id
router.route('/getStudentById/:id').get(getStudentById);
//API for get all the students info
router.route('/getStudents').get(getStudents);
//API for get all the mentors info
router.route('/getMentors').get(getMentors);

//exports the router

module.exports=router;







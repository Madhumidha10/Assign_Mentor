import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./Api";

function ChangeMentor() {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  function getInfo() {
    fetch(`${API}/getMentors`)
      .then((data) => data.json())
      .then((mnts) => setMentors(mnts));
    fetch(`${API}/getStudents`)
      .then((data) => data.json())
      .then((stds) => setStudents(stds));
  }
  useEffect(() => {
    getInfo();
  }, []);

//******************Assign or Change mentor info based on id
  const AssignChangeMentor = (mentorId, updateInfo) => {
    fetch(`${API}/assignMentor/${mentorId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },

      //Assign JSON body
      body: JSON.stringify(updateInfo),
    }).then((res) => {
      console.log(res);
    });
  };


  const handleAssign = () => {
    let msg = document.getElementById("msg");
    //get selected student
    var student = document.querySelector(
      'option[value="' + document.querySelector("#studentList").value + '"]'
    );
    //get selected mentor
    var mentor = document.querySelector(
      'option[value="' + document.querySelector("#mentorList").value + '"]'
    );
  
    if (!student) msg.innerHTML = "Student must be seleted in";  //student not select
    else if (!mentor) msg.innerHTML = "Mentor must be seleted in";  //mentor not select
    else {//both or selected
      msg.innerHTML = "";
      //get selected student info
      var updateStudent = students.filter((stu) => student.id === stu._id)[0];
      let index_id = parseInt(mentor.getAttribute("name"));
      //get selected mentor info
      let updateMentor = mentors[index_id];
      //check whether student already got mentor
      if (updateStudent.mentor_status === "A") {
        //get Assigned mentor info for this student
        var pre_mentor = mentors.filter(
          (el) => el.Assigned_students.indexOf(student.id) > -1
        )[0];
        //remove this student from the list
        var newStudentList = pre_mentor.Assigned_students.filter(
          (st) => st !== student.id
        );
        //update this list
        pre_mentor.Assigned_students = newStudentList;
        //updated the student info
        var updateInfo = {
          name: pre_mentor.name,
          email: pre_mentor.email,
          contact: pre_mentor.contact,
          Assigned_students: newStudentList,
        };
        //changes to updated
        AssignChangeMentor(pre_mentor._id, updateInfo);
      } else {
        //assign mentor status to the student
        updateStudent.mentor_status = "A";
       //updated the student info
        fetch(`${API}/updateStudent/${student.id}`, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          //assign the JSON body
          body: JSON.stringify(updateStudent),
        }).then((res) => {
          console.log(res);
        });
      }
      //Add this student to the new mentor
      updateMentor.Assigned_students = [
        ...updateMentor.Assigned_students,
        student.id,
      ];
      //finally assign new mentor to the student
      AssignChangeMentor(mentor.id, updateMentor);
      //redirect to check student list
      navigate("/studentlist");
    }
  };
  return (
    <div className="container mt-5 px-2 col-sm-4 bg-dark text-white rounded">
      <h5 className="text-white p-4"> Change Mentor</h5>
      <div className="mb-2 mt-5 d-block justify-content-between align-items-center">
        <label htmlFor="studentList" className="form-label">
          Student
        </label>

        <div className="position-relative">
          <span className="position-absolute search">
            <i className="fa fa-search"></i>
          </span>

          <input
            className="form-control w-100"
            placeholder="Select student"
            list="studentOptions"
            id="studentList"
            autoComplete="off"
          />
          <datalist id="studentOptions">
            {students.map(({ _id, name }, index) => (
              <option value={name} id={_id} key={index} name={index} />
            ))}
          </datalist>
        </div>

        <label htmlFor="mentorList" className="form-label">
          Mentor
        </label>

        <div className="position-relative">
          <span className="position-absolute search">
            <i className="fa fa-search"></i>
          </span>

          <input
            className="form-control w-100"
            placeholder="Select Mentor..."
            list="mentorOptions"
            id="mentorList"
            autoComplete="off"
          />
          <datalist id="mentorOptions">
            {mentors.map(({ _id, name }, index) => (
              <option value={name} id={_id} key={index} name={index} />
            ))}
          </datalist>
        </div>
        <div id="msg" className="p-2 mb-1 text-danger  text-left ">
          {" "}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleAssign()}
      >
        Change
      </button>
    </div>
  );
}

export default ChangeMentor;


import React, { useEffect, useState } from "react";
import { API } from "./Api";

export default function StudentList() {
  //assign the state varaiables
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [assign, setAssign] = useState([]);
  
  function getInfo() {
    //get all mentors
    fetch(`${API}/getMentors`)
      .then((data) => data.json())
      .then((mnts) => setMentors(mnts));
    //get all students
    fetch(`${API}/getStudents`)
      .then((data) => data.json())
      .then((stds) => setStudents(stds));
    //default value for all the student
    setAssign(students);
  }

  useEffect(() => {
    getInfo()},[])

  const handleShow = (e) => {
    //get the selected mentor
    var mentor = document.querySelector(
      'option[value="' + document.querySelector("#mentorList").value + '"]'
    );
    var msg = document.getElementById("msg");
    if (mentor) {
      let index_id = parseInt(mentor.getAttribute("name"));
      //get student id based on mentor
      let stu_list = mentors[index_id].Assigned_students;
      //assign selected student based on mentor
      setAssign(
        students.filter((el) => {
          return stu_list.indexOf(el._id) > -1;
        })
      );
      msg.innerHTML = "";
      document.querySelector("table").style.display = "block";
    } else {
      document.querySelector("table").style.display = "none";
      msg.innerHTML = "Mentor must be seleted in";
    }
  };

  return (
    <div className="container-fluid mt-5 px-2 col-sm-4 ">
      <h5 className="text-dark p-4 ">Student List</h5>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <div className="position-relative">
          <span className="position-absolute search">
            <i className="fa fa-search"></i>
          </span>
          <input
            className="form-control w-100"
            placeholder="Select mentor..."
            list="mentorOptions"
            id="mentorList"
          />
          <datalist id="mentorOptions">
            {mentors.map(({ _id, name }, index) => (
              <option value={name} id={_id} key={index} name={index} />
            ))}
          </datalist>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => handleShow()}
        >
          View Student
        </button>
      </div>
      <div id="msg" className="p-2 mb-1 text-danger  text-left ">
        {" "}
      </div>
      {students.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-responsive table-striped">
            <thead>
              <tr className="bg-dark text-white">
                <th scope="col" width="5%"></th>
                <th scope="col" width="5%" className="d-none">
                  #
                </th>
                <th scope="col" width="30%">
                  Name
                </th>
                <th scope="col" width="30%">
                  Email
                </th>
                <th scope="col" width="30%">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {assign.length>0?assign.map(({ _id, name, email, contact }, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td className="d-none">{_id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{contact}</td>
                </tr>
              )):<tr><th colSpan={4}>Select the mentor</th></tr>}
            </tbody>
          </table>
        </div>
      ) :  ""
      }
    </div>
  );
}

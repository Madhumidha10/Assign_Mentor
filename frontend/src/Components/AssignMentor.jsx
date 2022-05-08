import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./Api";

function AssignMentor() {
  //asssign the state variables
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [aStd, setAstd] = useState([]);
  const [aInd, setAind] = useState([]);

  function getInfo() {
    //get all mentors
    fetch(`${API}/getMentors`)
      .then((data) => data.json())
      .then((mnts) => setMentors(mnts));
    //get all mentor not assigned students
    fetch(`${API}/getMNAStudents`)
      .then((data) => data.json())
      .then((stds) => setStudents(stds));
  }

  useEffect(() => {
    getInfo();
  }, []);

  //filtered the students based on checkbox selection
  const handleChange = (e, _id, index) => {
    if (e.target.checked) {
      //add the students
      setAstd([...aStd, _id]);
      setAind([...aInd, index]);
    } else {
      //remove the students
      aStd.splice(aStd.indexOf(_id), 1);
      aInd.splice(aInd.indexOf(index), 1);
    }
  };

  const handleAssign = () => {
    let msg = document.getElementById("msg");
    //find the selected mentor
    var mentor = document.querySelector(
      'option[value="' + document.querySelector("#mentorList").value + '"]'
    );

    if (!mentor)
      msg.innerHTML = "Mentor must be seleted in"; //error msg for mentor
    else if (aStd == "") msg.innerHTML = "Atleast One Student must be checked ";
    //error msg for student
    else {
      let index_id = parseInt(mentor.getAttribute("name"));
      let updateMentor = mentors[index_id];
      //add the student to the mentor
      updateMentor.Assigned_students = [
        ...updateMentor.Assigned_students,
        ...aStd,
      ];
      //update the mentor info
      fetch(`${API}/assignMentor/${mentor.id}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        //assign JSON body
        body: JSON.stringify(updateMentor),
      }).then((res) => {
        console.log(res);
      });
      //update the mentor assigned student info
      {
        aStd.map((studid, ind) => {
          let updateStudent = students[aInd[ind]];
          updateStudent.mentor_status = "A";
          fetch(`${API}/updateStudent/${studid}`, {
            method: "put",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateStudent),
          }).then((res) => {
            console.log(res);
          });
        });
      }
      //redirect to studentlist page
      navigate("/studentlist");
    }
  };
  return (
    <div className="container-fluid mt-5 px-2 col-sm-4 ">
      <h5 className="text-dark p-4 ">Assign Mentor</h5>
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
            autoComplete="off"
          />
          <datalist id="mentorOptions">
            {mentors.map(({ _id, name }, index) => (
              <option value={name} id={_id} key={index} name={index} />
            ))}
          </datalist>
        </div>
        <div id="msg" className="p-2 mb-1 text-danger h6 text-left ">
          {" "}
        </div>
      </div>
      {mentors ? (
        <div className="table-responsive">
          <table className="table table-responsive table-striped">
            <thead>
              <tr className="bg-dark text-white">
                <th scope="col" width="10%"></th>
                <th scope="col" width="5%" className="d-none">
                  #
                </th>
                <th scope="col" width="20%">
                  Name
                </th>
                <th scope="col" width="10%">
                  Email
                </th>
                <th scope="col" width="20%">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map(({ _id, name, email, contact }, index) => (
                  <tr key={index}>
                    <th scope="row">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => handleChange(e, _id, index)}
                      />
                    </th>
                    <td className="d-none">{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{contact}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th scope="row" colSpan={4}>
                    Students Not Found.
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      {students.length > 0 ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAssign()}
        >
          Assign
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default AssignMentor;

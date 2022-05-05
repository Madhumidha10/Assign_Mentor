import React,{useState} from "react";

function CreateMentor() {
  return (
    <div className="container col-md4 mx-auto mt-5">
               <h5> Create Mentor</h5>
      <form>
        <div className="form-group">
        <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Mentor Name"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email Id"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="contact"
            placeholder="Contact Number"
          />
        </div>
        <button type="button" className="btn btn-dark">
          Add Mentor
        </button>
      </form>
    </div>
  );
}

export default CreateMentor;

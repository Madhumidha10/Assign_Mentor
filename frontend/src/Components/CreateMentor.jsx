
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./Api";
import { useNavigate } from "react-router-dom";
//mentor validation schema using yup
const mentorValidationSchema = yup.object({
  name: yup.string().required("Name must be filled in *"),
  email: yup.string().required("Email must be filled in *"),
  contact: yup.string().required("Contact must be filled in *"),
});
//create a main function CreateMentor
function CreateMentor() {

  const navigate = useNavigate();
  //formik initialize,validation and store data to the mentor.
  const formik = useFormik({
    initialValues: { name: "", email: "", contact: "" },
    validationSchema: mentorValidationSchema,
    onSubmit: (values) => {
      const newMentor = {
        name: values.name,
        email: values.email,
        contact: values.contact,
        Assigned_students: [],
      };

      //add new mentor
      fetch(`${API}/createMentor`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        //assign JSON body
        body: JSON.stringify(newMentor),
      }).then((res) => {
        navigate("/studentlist");//success redirect to student list
      });
    },
  });
  return (
    <div className="container col-sm-4 mx-auto mt-5 bg-dark rounded">
      <form>
        <h5 className="text-white p-4"> Create Mentor</h5>
        <br />
        {formik.touched.name && formik.errors.name ? (
          <div className="p-2 mb-1 text-danger text-left">
            {formik.errors.name}
          </div>
        ) : (
          ""
        )}
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Mentor Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            
          />
        </div>
        <br />
        {formik.touched.email && formik.errors.email ? (
          <div className="p-2 mb-1 text-danger text-left">
            {formik.errors.email}
          </div>
        ) : (
          ""
        )}

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email Id"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <br />
        {formik.touched.contact && formik.errors.contact ? (
          <div className="p-2 mb-1 text-danger text-left">
            {formik.errors.contact}
          </div>
        ) : (
          ""
        )}

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="contact"
            placeholder="Contact Number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contact}
          />
        </div>
        <button
          type="button"
          className="btn btn-info mb-5"
          onClick={formik.handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateMentor;

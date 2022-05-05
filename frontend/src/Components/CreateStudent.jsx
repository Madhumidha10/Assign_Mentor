import React,{useState} from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
const studentValidationSchema = yup.object(
    {name: yup.string().required("Name must be filled in"),
    email: yup.string().required("Email must be filled in"),
    contact: yup.string().required("Email must be filled in"),
});
function CreateStudent() {
    const formik = useFormik({
        initialValues: { name: "", email: "",contact:"" },
        validationSchema: studentValidationSchema,
        onSubmit: (values) => {
        const newStudent={
            name:values.name,
            email:values.email,
            contact:values.contact,
            mentor_status:'N'
        }
     console.log(newStudent);
    }
});

  return (
    <div className="container col-sm-4 mx-auto mt-5 bg-dark rounded">
    
      <form >
      <h5 className='text-white p-4'> Create Student</h5>
          <br />{formik.touched.name && formik.errors.name ? <div className="p-2 mb-1 text-danger">{formik.errors.name}</div> : ""}
        <div className="form-group">
       
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Student Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
           
        </div>
        <br />{formik.touched.email && formik.errors.email ? <div className="p-2 mb-1 bg-danger text-white">{formik.errors.email}</div>  : ""}
        
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
            <br />{formik.touched.contact && formik.errors.contact ? <div className="p-2 mb-1 bg-danger text-white">{formik.errors.contact}</div>  : ""}
        
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
        <button type="button" className="btn btn-info mb-5" onClick={formik.handleSubmit}>
          Save
        </button>
      </form>
    </div>
  )
}

export default CreateStudent
import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<Link to={'/'} className='navbar-brand'>
        Assign Mentor
     </Link>
   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

<div className='navbar-nav'>
    <Link to={'/creatementor'} className='nav-item nav-link' >
        Add Mentor
     </Link>
     <Link to={'/createstudent'} className='nav-item nav-link' >
        Add Student
     </Link>
     <Link to={'/assignmentor'} className='nav-item nav-link' >
     Assign Mentor
     </Link>
     <Link to={'/changementor'} className='nav-item nav-link' >
     Change Mentor
     </Link>
     <Link to={'/studentlist'} className='nav-item nav-link' >
      Student List
     </Link>
   
     </div>
  </div> 
</nav>
  )
}

export default Header
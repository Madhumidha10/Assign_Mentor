
import './App.css';
import Header from './Components/Header';
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import CreateMentor from './Components/CreateMentor';
import CreateStudent from './Components/CreateStudent';
import AssignMentor from './Components/AssignMentor';
import ChangeMentor from './Components/ChangeMentor';
import StudentList from './Components/StudentList';
function App() {
  return (
    <div className="App">
    <Header />
    
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/creatementor' element={<CreateMentor />} />
      <Route path='/createstudent' element={<CreateStudent />} />
      <Route path='/assignmentor' element={<AssignMentor />} />
      <Route path='/changementor' element={<ChangeMentor />} />
      <Route path='/studentlist' element={<StudentList />} />
    </Routes>
    </div>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Employee from './employee';
import CreateEmployee from './createEmployee';
import UpdateEmployee from './updateEmployee';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Employee />}></Route>
            <Route path='/createEmployee' element={<CreateEmployee />}></Route>
            <Route path='/updateEmployee/:id' element={<UpdateEmployee />}></Route> 
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

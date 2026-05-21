
import './App.css';
import HomePage from './Pages/HomePage'
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import ProtectedRoute from './Components/ProtectedRoute'
import SingleMoviePage from './Pages/SingleMoviePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profiles from './Pages/Profiles';
import Admin from './Pages/Admin';
import Owners from './Pages/Owners';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/movies/:id" element={<ProtectedRoute> <SingleMoviePage/> </ProtectedRoute>}></Route>
        <Route path ="/admin" element ={<ProtectedRoute><Admin/></ProtectedRoute>}/>
        <Route path ="/showsManage" element ={<Owners/>} />
        <Route path="/my-profile" element={<ProtectedRoute> <Profiles /> </ProtectedRoute>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App ;

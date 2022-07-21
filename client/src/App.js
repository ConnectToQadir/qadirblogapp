import './App.css';
import TopBar from "./components/topbar/TopBar";
import Home from './components/pages/home/Home';
import Single from './components/pages/single/Single';
import Write from "./components/pages/write/Write";
import Register from './components/pages/register/Register'
import Login from "./components/pages/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Context} from './context/Context'
import { useContext } from 'react';
function App() {
  const {user} = useContext(Context);
  return (
    <div className="App">
      <Router>
        <TopBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/write' element={user?<Write />:<Register />} />
          <Route exact path='/post/:postId' element={<Single />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

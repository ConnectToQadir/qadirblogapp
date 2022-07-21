import './TopBar.css';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import {Context} from '../../context/Context'

export default function TopBar() {
  const {user,dispatch} = useContext(Context);
  const handleLogout = () =>{
    window.confirm("Are you sure to LOGOUT?") && dispatch({type:"LOGOUT"})
  }


  return (
    <div className='topbar'>
      <div className="topLeft">
        <i className="topIcons fa-brands fa-facebook-square"></i>
        <i className="topIcons fa-brands fa-twitter-square"></i>
        <i className="topIcons fa-brands fa-instagram-square"></i>
        <i className="topIcons fa-brands fa-linkedin"></i>
      </div>
      <div className="topCenter">
        <ul className='navLinks'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">About</Link></li>
          <li><Link to="/">Contact</Link></li>
          <li><Link to="/write">Write</Link></li>
          { user ? <li><Link to="/" onClick={handleLogout}>LogOut</Link></li>:<></>}
        </ul>
      </div>
      <div className="topRight">
        {user ?
          <span className='userDiv'>
              <img src={user?.profilePic?user.profilePic:"https://missionvet.ca/wp-content/uploads/2020/01/User-Profile-PNG-812x812.png"} alt="" />
              <span className='usernameDiv'>{user.username}</span>
          </span>
        :(<>
            <ul className="navLinks">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </>
        )}
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

import './Login.css';
import { Link } from 'react-router-dom';
import {useRef,useContext,useState} from 'react'
import {Context} from "../../../context/Context"
import axios from 'axios'

export default function Register() {

  const uNameRef = useRef();
  const passwordRef = useRef();
  const [err,setErr] = useState(false);
  const {dispatch,isFetching} = useContext(Context);

  const submitHandler =async (e) =>{
    e.preventDefault();
    setErr(false);
    dispatch({type:"LOGIN_START"});
    try {
      const res =await axios.post("/api/auth/login",{
        username:uNameRef.current.value,
        password:passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
      window.location.replace("/");
    } catch (error) {
      setErr(true);
      dispatch({type:"LOGIN_FAILURE"});
    }
  }


  return (
    <div className="login">
      <Link to="/register">
        <button className="topBtnRegister">Register</button>
      </Link>
      <form className="wrapper" onSubmit={submitHandler}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input ref={uNameRef} type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" name="password" id="password" />
        <button type='submit' disabled={isFetching}>Login</button>
        {err?<div style={{textAlign:"center",marginTop:"10px",color:"red"}}>Something Went Wrong!</div>:<></>}
      </form>
    </div>
  )
}

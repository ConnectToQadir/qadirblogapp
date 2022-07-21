import "./Register.css"
import { Link } from 'react-router-dom';
import { useState,useContext } from "react";
import axios from 'axios';
import {Context} from "../../../context/Context"

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(false);
  const {regUser,dispatch} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password
    }

    if (file) {
      const data = new FormData();
      const dotArray = file.name.split(".")
      const lastIndex = dotArray.length - 1;
      const extension = dotArray[lastIndex]
      const filename = `userImage_${Date.now()}.${extension}`;  //"userImage" + "_" + Date.now() + "." + extension
      data.append("name", filename);
      data.append("file", file);
      const PF = "/images/";
      newUser.profilePic = PF+filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        alert("An Error has been occured while uploading image! " + err)
      }
    }

    try {
      setErr(false);
      dispatch({type:"REGISTERING_START"})
      const res = await axios.post("/api/auth/register",newUser)
      if (res.data) {
        alert(`A new user "${res.data.username}" has been Registered.`)
        window.location.replace("/login");
      }
    } catch (error) {
      setErr(true);
      dispatch({type:"REGISTERING_FAILURE"})
      setErr(true);
    }

  }


  return (
    <div className="register">
      <Link to="/login">
        <button className="topBtnLogin">Login</button>
      </Link>
      <form method="get">
        <div className="wrapper">
          <h1>Register</h1>
          <div className="inputImgDiv">
            <label htmlFor="fileInput">
              <div className="userDiv">
                {file ? <img src={URL.createObjectURL(file)} alt="" />:<i className="fa-solid fa-user"></i>}
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="cameraDiv"><i className="fa-solid fa-camera"></i></div>
          </div>
          <label htmlFor="userName">Username</label>
          <input type="text" name="userName" id="userName" onChange={e => setUsername(e.target.value)} value={username} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} value={email} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
          <button type="submit" onClick={submitHandler} disabled={regUser}>Register</button>
          {err ? <div style={{ textAlign: "center", marginTop: "10px", color: "red" }}>Something Went Wrong!</div> : <></>}
        </div>
      </form>
    </div>
  )
}

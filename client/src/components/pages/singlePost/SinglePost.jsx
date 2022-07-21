import './SinglePost.css'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { Context } from "../../../context/Context"
import {ThreeDots} from "react-loader-spinner";

export default function SinglePost() {

  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading,setLoading] = useState(false)
  const [postImagePath,setPostImagePath] = useState("");
  const { user } = useContext(Context);
  const PF = "/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];


  useEffect(() => {
    setLoading(true)
    var res;
    const fetchPost = async () => {
      res = await axios.get(`/api/post/${path}`);
      setPost(res.data);
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setPostImagePath(PF+res.data.photo)
      setLoading(false);
    }
    fetchPost();
  },[]);


  const deletehandler = async() =>{
    try {
      await axios.delete(`/api/post/${path}`,{data:{username:user.username,postId:path}}); //Api Deleting Post text
      
      try {               //Api Deleting Post Image
        await axios.post("/api/deleteImage",{imgName:post.photo});
      } catch (error) {
        alert(error)
      }
      window.location.replace("/")
    } catch (error) {
      alert("An error Accured while deleting this post => " + error)
    }
  }


  return (
    <div className='singlePost'>
      {loading? <div className="loading"><ThreeDots color="#000" height={80} width={80} /></div>:<img src={postImagePath} alt="" />}
      <div className="singlePostInfo">
        <div className="singlePostTitleAndEditIcons">
          <h1>{title}</h1>
          {post.username === user?.username &&
            <span className='siglePostEditIcons'>
              <i className="siglePostEditIcon fa-solid fa-pen-to-square"></i>
              <i className="siglePostDeleteIcon fa-regular fa-trash-can" onClick={deletehandler}></i>
            </span>
          }
        </div>
        <div className="SinlgePostAuthorAndTime">
          <span>
            <i className="fa-regular fa-user" style={{ marginRight: "7px" }}></i>
            <Link className='link' to={`/?user=${post.username}`}>{post.username}</Link>
          </span>
          <span>
            <i className="fa-regular fa-clock" style={{ marginRight: "7px" }}></i>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        <p className='singlePostDesc'>{desc}</p>
      </div>
    </div>
  )
}

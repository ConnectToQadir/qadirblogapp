import "./Posts.css"
import Post from './../post/Post'
import { useEffect, useState } from "react"
import axios from  'axios'
import { useLocation } from "react-router-dom"
import {ThreeDots} from "react-loader-spinner";


export default function Posts() {

  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    try {
      setLoading(true);
      const fetchPosts =async () =>{
        const res =await axios.get("/api/post"+search)
        setPosts(res.data);
        res && setLoading(false);
      }
      fetchPosts();
    } catch (error) {
      console.log("error")
    }
  },[search])

  return (
    <div className="posts">
      {
        loading ? <div><ThreeDots color="#000" height={80} width={80} /></div>:posts.map((p,i)=><Post key={i} posts={p} />)
      }
    </div>
  )
}

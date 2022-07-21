import "./SideBar.css";
import { useEffect, useState } from "react"
import axios from  'axios'
import { Link } from "react-router-dom";


export default function SideBar() {
  const [categories,setCategories] = useState([]);


  useEffect(()=>{
    try {
      const fetchPosts =async () =>{
        const res =await axios.get("/api/cate/categories")
        setCategories(res.data);
      }
      fetchPosts();
    } catch (error) {
      console.log("error")
    }
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarItemTitle">ABOUT ME</span>
        <img src="https://api.time.com/wp-content/uploads/2015/04/google-sign.jpg" alt="" />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore quo ipsum eaque, mollitia quisquam qui laboriosam magni vel quia.</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarItemTitle">CATEGORIES</span>
        <ul className="categoriesList">
          {categories.map((v,i)=><li key={i} className="listItem"><Link className="link" to={`/?cat=${v.name}`}>{v.name}</Link></li>)}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarItemTitle">FOLLOW US</span>
        <div className="sidebarSocialIcons">
        <i className="sidebarIcons fa-brands fa-facebook-square"></i>
        <i className="sidebarIcons fa-brands fa-twitter-square"></i>
        <i className="sidebarIcons fa-brands fa-instagram-square"></i>
        <i className="sidebarIcons fa-brands fa-linkedin"></i>
        </div>
      </div>
    </div>
  )
}

import "./Home.css"
import Header from './../../header/Header'
import Posts from './../../posts/Posts'
import Sidebar from './../../sidebar/SideBar'


const Home = () =>{

  return (
    <div>
        <Header />
        <div className="postsAndSidebar">
            <Posts />
            <Sidebar />
        </div>
    </div>
  )
}

export default Home;
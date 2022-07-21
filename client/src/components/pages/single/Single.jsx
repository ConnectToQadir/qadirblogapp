import './Single.css';
import SinglePost from '../singlePost/SinglePost'
import Sidebar from "./../../sidebar/SideBar"

export default function Single() {
  return (
    <div className='single'>
        <SinglePost />
        <Sidebar />
    </div>
  )
}

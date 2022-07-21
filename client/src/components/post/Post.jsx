import "./Post.css"
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Post(props) {
    const PF = "/images/";
    return (
        <div className="post">
            <div className="imgDiv">
                <LazyLoadImage effect="blur" src={PF+props.posts.photo} alt="" />
            </div>
            <div className="postInfo">
                <div className="postCats">
                    {props.posts.categories.map((v,i) => <span key={i} className="postCat">{v}</span>)}
                </div>
                <Link className="link" to={"/post/" + props.posts._id}>
                    <span className="postTitle">
                        {props.posts.title}
                    </span>
                </Link>

                <span className="postDate">
                    {new Date(props.posts.createdAt).toDateString()}
                </span>
                <span className="postDisc">
                    {props.posts.desc}
                </span>
            </div>
        </div>
    )
}

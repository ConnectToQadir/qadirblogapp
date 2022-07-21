import './Header.css'

export default function Header() {
  return (
    <div className='header'>
        <div className="headerTitles">
            <span className='headerTitleSm'>React & Node</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        {/* <img src="images/headerImg.jpg" alt='' /> */}
        <div className="headerImgDiv"></div>
    </div>
  )
}

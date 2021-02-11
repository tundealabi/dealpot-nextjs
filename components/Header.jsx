import { signOut } from "next-auth/client";
import CustomLink from './CustomLink.jsx';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../styles/Header.module.css';
import { userReadNotification } from "../lib/utils/notification-helper";

const Header = ({handleModal, displayFormContent,handleSideNav,user,focused,deactivateFocus, handleNotificationModal}) => {
  // console.log("header-user",user)
const router = useRouter();
const [searchTerm, changeSearch] = useState("");
const searchInput = useRef(null);
const [ unreadNotification, setUnreadNotification ] = useState(0);
const [ notificationIsupdated, setNotificationIsUpdated ] = useState(false);

const handleSearch = () => {
  if(searchTerm.trim().length) router.push(`/search?q=${searchTerm}`);
}
const handleSubmitSearch = (e) => {
  e.preventDefault();
  if(searchTerm.trim().length) router.push(`/search?q=${searchTerm}`);
}

useEffect(()=>{
  if(focused) {
    searchInput.current.focus();
    deactivateFocus(false);
  }
  if(user){
    if( !notificationIsupdated ){
      setUnreadNotification(user.numbOfNotification)
    }
    if(notificationIsupdated && !user.numbOfNotification){
      setNotificationIsUpdated(false);
    }
  }
  if(router.query.q){
    if(router.query.q.length > 1 && !searchTerm.length){
      changeSearch(router.query.q)
    }
  }
},[focused, user, router.query]);


const handleModalToggle = (formContent) => {
    handleModal();
    displayFormContent(formContent);
}
const handleNotification = () => {
    if(user){
      handleNotificationModal(true);
      if(unreadNotification){
        userReadNotification(user._id).then((result)=> {
          if(result.data.message){
            setUnreadNotification(0);
            setNotificationIsUpdated(true);
          }
        });
      } 
    }else{
      toast.dark("Login to receive notifications",{
        autoClose: 3000,
        pauseOnFocusLoss: false,
        toastId: "linrole"
      });
    }
}
        return (
          <header className={style.header}>
            <div className={style.brandArea}>
              <div className={style.brandAreaLeft}>
                <div className={style.menubars}>
                  <i className="fas fa-bars" onClick={()=>handleSideNav(true) }></i>
                </div>
                <Link href="/">
                  <a>
                  <div>
                    <img src="/Path.png" alt="brand logo"/>
                    <img src="/Dealpot.png" alt="brand logo"/>
                  </div>
                  </a>
                </Link>
              </div>
              <div className={style.brandAreaRight}>
              <form onSubmit={handleSubmitSearch}>
                <div className="input-group mb-3 ">
                  <div className="input-group-prepend" >
                    <span className="input-group-text">
                      <i className="fas fa-angle-down"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={searchTerm}
                    onChange={(evet) => changeSearch(evet.target.value)}
                    ref={searchInput}
                  />
                  
                  <div className="input-group-append" onClick={handleSearch}>
                    <span className="input-group-text bg-white text-danger">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
                </form>
                {
                  user ? (
                        <div className={`dropdown ml-2 ${style.userIcon2}`}>
              <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                {`Hi, ${user.username}`}
              </button>
              <div className="dropdown-menu">
                <button className="dropdown-item" type="button" onClick={handleNotification}>Notification<span className={`badge text-white ml-2 ${unreadNotification ? "bg-danger" : "bg-primary"}`}>{unreadNotification}</span></button>
                <CustomLink href={"/customer/wishlist"} classs="dropdown-item" >Saved Items</CustomLink>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" type="button" onClick={()=>signOut({ callbackUrl: 'https://dealpot-nextjs.vercel.app' })}>Logout</button>
              </div>
            </div>
                  )
                  :
                  (
                    <div className={style.userIcon} data-toggle="dropdown">
                    <i className="far fa-user-circle" ></i>
                    <div className="dropdown-menu" >
                      <button className="dropdown-item" type="button" onClickCapture={()=>handleModalToggle("login")}>Login</button>
                      <button className="dropdown-item" type="button" onClickCapture={()=>handleModalToggle("signup")}>Create</button>
                      <div className="dropdown-divider"></div>
                      <CustomLink href={"/customer/wishlist"} classs="dropdown-item" >Saved Items</CustomLink>
    </div>
                  </div>
                  )
                }
                <div className={`${style.userIcon} ${unreadNotification ? "text-danger" : ""}`} onClick={handleNotification}>
                  <i className="fas fa-bell"></i>
                </div>
              </div>
            </div>
            <div className={style.categoryLinks}>
              <div className={style.allcat} data-toggle="dropdown" >
                  <i className="fas fa-bars"></i>
                  <span>All Categories</span>
                  <div className="dropdown-menu" >
                    <CustomLink href={"/category/category-fashion"} classs={"dropdown-item"}>Fashion</CustomLink>
                    <CustomLink href={"/category/category-edible"} classs={"dropdown-item"}>Food &amp; Groceries</CustomLink>
                    <CustomLink href={"/category/category-care"} classs={"dropdown-item"}>Health &amp; Beauty</CustomLink>
                    <CustomLink href={"/category/category-home-kitchen"} classs={"dropdown-item"}>Home &amp; Kitchen</CustomLink>
                    <CustomLink href={"/category/category-office-school"} classs={"dropdown-item"}>Office &amp; School</CustomLink>
                    <CustomLink href={"/category/category-phone"} classs={"dropdown-item"}>Phone &amp; Tablet</CustomLink>
                    <CustomLink href={"/category/category-computing"} classs={"dropdown-item"}>Computing</CustomLink>
                    <CustomLink href={"/category/category-tech-accessories"} classs={"dropdown-item"}>Tech Accessories</CustomLink>
                    <CustomLink href={"/category/category-electronics"} classs={"dropdown-item"}>Electronics</CustomLink>
                    <CustomLink href={"/category/category-video-game"} classs={"dropdown-item"}>Gaming</CustomLink>
                    <CustomLink href={"/category/category-automobile"} classs={"dropdown-item"}>Automobile</CustomLink>
                    <CustomLink href={"/category/category-baby-product"} classs={"dropdown-item"}>Baby products</CustomLink>
                    <CustomLink href={"/category/category-sports"} classs={"dropdown-item"}>Sporting Goods</CustomLink>
  </div>
              </div>
                     <Link href="/category/category-fashion"><a className={style.categoryLink} >Fashion</a></Link>
                     <Link href="/category/category-edible"><a className={style.categoryLink} >Food</a></Link>
                     <Link href="/category/category-home-kitchen"><a className={style.categoryLink} >Kitchen</a></Link>
                     <Link href="/category/category-phone"><a className={style.categoryLink} >Phone</a></Link>
                     <Link href="/category/category-tech-accessories"><a className={style.categoryLink} >Accessories</a></Link>
            </div>
          </header>
        );
    }

export default Header;
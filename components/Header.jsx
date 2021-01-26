import { getSession, useSession, signOut } from "next-auth/client";
import CustomLink from './CustomLink.jsx';
import Link from "next/link";
import { useRouter } from 'next/router';
import {  useEffect, useState } from "react";
import style from '../styles/Header.module.css';

const Header = ({handleModal, displayFormContent,handleSideNav,userSession:{session,loading}}) => {
const [user, setUser] = useState(null);

// {username:"Jakererere"}
const [searchTerm, changeSearch] = useState("");

//  getSession().then(val=>console.log("sess",val))

useEffect(()=>{
  if(session){
    setUser(session.user);
  }else{
    setUser(null);
  }
},[ loading ])
//         console.log("head",session)
//         console.log("load",loading)
const handleModalToggle = (formContent) => {
    handleModal();
    displayFormContent(formContent);
}
        return (
          <header className={style.header}>
            <div className={style.brandArea}>
              <div className={style.brandAreaLeft}>
                <div className={style.menubars}>
                  <i className="fas fa-bars" onClick={()=>handleSideNav(true) }></i>
                </div>
                <Link href="/">
                  <div>
                    <img src="/Path.png" alt="brand logo"/>
                    <img src="/Dealpot.png" alt="brand logo"/>
                  </div>
                </Link>
              </div>
              <div className={style.brandAreaRight}>
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
                  />
                  <div className="input-group-append">
                    <span className="input-group-text bg-white text-danger">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
                {
                  user ? (
                        <div className={`dropdown ml-2 ${style.userIcon2}`}>
              <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                {`Hi, ${user.username}`}
              </button>
              <div className="dropdown-menu">
                <button className="dropdown-item" type="button">Account</button>
                <CustomLink href={"/customer/wishlist"} classs="dropdown-item" >Saved Items</CustomLink>
                <button className="dropdown-item" type="button">Notification</button>
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
                <div className={style.userIcon}>
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
                    <CustomLink href={"/category/category-baby-produict"} classs={"dropdown-item"}>Baby products</CustomLink>
                    <CustomLink href={"/category/category-sports"} classs={"dropdown-item"}>Sporting Goods</CustomLink>
  </div>
              </div>
                     <Link href="/category/category-fashion"><a className={style.categoryLink} >Fashion</a></Link>
                     <Link href="/category/category-edible"><a className={style.categoryLink} >Food</a></Link>
                     <Link href="/category/category-home-kitchen"><a className={style.categoryLink} >Home</a></Link>
                     <Link href="/category/category-phone"><a className={style.categoryLink} >Phone</a></Link>
                     <Link href="/category/category-tech-accessories"><a className={style.categoryLink} >Accessories</a></Link>
            </div>
          </header>
        );
        // return(
        //     <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark ">
        //     <Link href="/">
        //     <a className="navbar-brand">Dealpot</a>
        //     </Link>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //       <span className="navbar-toggler-icon"></span>
        //     </button>
        
        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //       <ul className="navbar-nav mr-auto">
        //         <li className="nav-item active">
        //           <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
        //         </li>
        //         <li className="nav-item dropdown">
        //           <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //             Categories
        //           </a>
        //           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                   
        //             <div className="dropdown-divider"></div>
        //             <a className="dropdown-item" href="">is not available yet</a>
        //           </div>
        //         </li>
        //       </ul>
        //       <button type="button" id="notifyBtn" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"></button>
        //       <form action="/search" method="GET" className="form-inline my-2 my-lg-0" id="search-form">
        //         <input className="form-control mr-sm-2" type="search" id="search-box" required name="search" placeholder="Search" aria-label="Search" defaultValue="" />
        //         <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        //       </form>
        //       <div className="dropdown user-icon">
        //         <a className="btn btn-secondary dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //           {user ? `Hi, ${user.username}` : "user option"}
        //         </a>
              
        //         <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        //             {
        //                 user ?
        //                 <>
        //                 <Link href=""><a className="dropdown-item" >Account</a></Link>
        //                 <Link href="/customer/wishlist"><a className="dropdown-item" >Saved Items</a></Link>
        //                 <hr />
        //                 <Link href="/customer/logout"><a className="dropdown-item" >LOGOUT</a></Link>
        //                 </>
        //                 :
        //                 <>
        //                 <Link href="/api/auth/signin"><a className="dropdown-item" >LOGIN</a></Link>
        //                 <Link href="/customer/account/create"><a className="dropdown-item" >CREATE</a></Link>
        //             <hr />
        //             <Link href=""><a className="dropdown-item" >Account</a></Link>
        //             <Link href="/customer/account/create"><a className="dropdown-item" >Saved Items</a></Link>
        //             </>
        //             }
        //         </div>
        //       </div>
        //     </div>
        //   </nav>
        // )
    }

export default Header;
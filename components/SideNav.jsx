import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../styles/Sidenav.module.css';
import Link from "next/link";
import { signOut } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { userReadNotification } from "../lib/utils/notification-helper";


const SideNav = ({displayFormContent,handleModal,showSideNav,handleSideNav,user, handleNotificationModal}) => {
    const [ unreadNotification, setUnreadNotification ] = useState(0);
    const [ notificationIsupdated, setNotificationIsUpdated ] = useState(false);
    
    useEffect(()=>{
        if(user){
          if( !notificationIsupdated ){
            setUnreadNotification(user.numbOfNotification)
          }
          if(notificationIsupdated && !user.numbOfNotification){
            setNotificationIsUpdated(false);
          }
        }
      },[user]);
    
    const handleModalToggle = (formContent) => {
        if(!user){
            handleSideNav(false)
            handleModal();
            displayFormContent(formContent);
        }
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
        <div className={showSideNav ? style.sidenav : "hide"}>
            <div className={style['sidenav-head']}>
                {user ? <p>Welcome, {user.username}</p> : null}
                <span className={style.closebtn} onClick={()=>handleSideNav(false) }><i className="far fa-times-circle"></i></span>
            </div>
            <div className={style.browseCats}>
                <p>Browse categories</p>
                <ul>
                    <Link href="/category/category-automobile"><li><a>Automobile</a></li></Link>
                    <Link href="/category/category-baby-product"><li><a>Baby products</a></li></Link>
                    <Link href="/category/category-computing"><li><a>Computing</a></li></Link>
                    <Link href="/category/category-electronics"><li><a>Electronics</a></li></Link>
                    <Link href="/category/category-fashion"><li><a>Fashion</a></li></Link>
                    <Link href="/category/category-edible"><li><a>Food &amp; Groceries</a></li></Link>
                    <Link href="/category/category-video-game"><li><a>Gaming</a></li></Link>
                    <Link href="/category/category-care"><li><a>Health &amp; Beauty</a></li></Link>
                    <Link href="/category/category-home-kitchen"><li><a>Home &amp; Kitchen</a></li></Link>
                    <Link href="/category/category-office-school"><li><a>Office &amp; School</a></li></Link>
                    <Link href="/category/category-phone"><li><a>Phone &amp; Tablet</a></li></Link>
                    <Link href="/category/category-sports"><li><a>Sporting Goods</a></li></Link>
                    <Link href="/category/category-tech-accessories"><li><a>Tech Accessories</a></li></Link>
                </ul>
            </div>
            <div className={style.account}>
                <p onClick={()=>handleModalToggle("login")}>Login</p>
                <p onClick={()=>handleModalToggle("signup")}>Signup</p>
            </div>
            <div className={style.wishlist}>
                  <Link href="/customer/wishlist">
                    <a>Wishlist</a>
                  </Link>
            </div>
            <div className={style.notification} onClick={handleNotification}>
                Notification
                <span className={`badge ${unreadNotification ? "bg-danger" : "bg-secondary"}`}>{unreadNotification}</span>
            </div>
            <div className={style.signOut} >
                {user ? <p onClick={()=>signOut({ callbackUrl: 'https://dealpot-nextjs.vercel.app' })}>Sign Out</p> : <p>Sign Out</p>}
            </div>
            <div className={style.address}>
                <p><span>Address: </span>16A Fola Jinadu<span>Crescent Gbagada Lagos, Nigeria</span></p>
            </div>
        </div>
    )
}

export default SideNav;
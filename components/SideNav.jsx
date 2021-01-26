import style from './sidenav.module.css';
import Link from "next/link";
import { signOut } from 'next-auth/client';
const SideNav = ({displayFormContent,handleModal,showSideNav,handleSideNav,userSession:{session,loading}}) => {
    const handleModalToggle = (formContent) => {
        if(!session){
            handleSideNav(false)
            handleModal();
            displayFormContent(formContent);
        }
    }
    return (
        <div className={showSideNav ? style.sidenav : "hide"}>
            <div className={style['sidenav-head']}>
                {session && !loading ? <p>Welcome, {session.user.username}</p> : null}
                <span className={style.closebtn} onClick={()=>handleSideNav(false) }><i className="fas fa-times"></i></span>
            </div>
            <div className={style.browseCats}>
                <p>Browse categories</p>
                <ul>
                    <Link href="/category/category-edible"><li><a>Food &amp; Groceries</a></li></Link>
                    <Link href="/category/category-electronics"><li>Electronics</li></Link>
                    <li>Beauty</li>
                    <li>Home &amp; Kitchen</li>
                    <li>Fashion</li>
                    <li>Phones & Tablets</li>
                    <li>Home & Office</li>
                    <li>Automobile</li>
                </ul>
            </div>
            <div className={style.account}>
                <p onClick={()=>handleModalToggle("login")}>Login</p>
                <p onClick={()=>handleModalToggle("signup")}>Signup</p>
            </div>
            <div className={style.signOut}>
                {session && !loading ? <p onClick={()=>signOut({ callbackUrl: 'https://dealpot-nextjs.vercel.app' })}>Sign Out</p> : <p>Sign Out</p>}
            </div>
            <div className={style.address}>
                <p><span>Address: </span>16A Fola Jinadu<span>Crescent Gbagada Lagos, Nigeria</span></p>
            </div>
        </div>
    )
}

export default SideNav;
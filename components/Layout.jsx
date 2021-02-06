import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/client";
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalForm from './ModalForm.jsx';
import NotificationModal from "./NotificationModal";
import style from "../styles/Layout.module.css";
import Header from "./Header.jsx";
import SideNav from './SideNav.jsx';
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children, focused, deactivateFocus, showWishlistFooter, isWishlist }) {
  const [user, setUser] = useState(null);
  const [session, loading] = useSession();
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [notificationShow, setShowNotification] = useState(false);
  const [formContent, setFormContent] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);
  const [showgoTopIcon, setGoTopIcon] = useState(false);

  if(typeof window !== "undefined") window.onscroll = () => goTopShow();
  const goTopShow = () => {
      if(document.body.scrollTop > 2684 || document.documentElement.scrollTop > 2684){
        setGoTopIcon(true);
      }else{
        setGoTopIcon(false);
      }
  }
  const goTopControl = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; //For Chrome, Firefox, IE and Opera
    setGoTopIcon(false);
  }
  useEffect(()=>{
    if(session){
      setUser(session.user);
    }else{
      setUser(null);
    }
    if(router.query.loginform === "yes" && !loading && !user){
      handleModal();
      displayFormContent("login");
      router.replace("/");
    }
  },[ session, router.query.loginform ]);

  const handleModal = () => {
    setModalShow(true);
  }
  const displayFormContent = (formType) => {
    setFormContent(formType);
  }


  return (
    <>
      <Head>
      <title>Dealpot</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content="Dealpot" />
      </Head>
      <div className={style.layout}>
      <SideNav handleModal={handleModal} displayFormContent={displayFormContent} showSideNav={showSideNav} 
               handleSideNav={setShowSideNav} user={user} handleNotificationModal={setShowNotification}/>
      <Header handleModal={handleModal} 
              displayFormContent={displayFormContent} 
              handleSideNav={setShowSideNav} user={user} focused={focused} deactivateFocus={deactivateFocus} handleNotificationModal={setShowNotification}/>
      {/* Modal  */}
      <ToastContainer />
      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        formContent={formContent}
        displayFormContent={displayFormContent}
        handleModal={()=>setModalShow(false)}
        size={formContent === 'signup' ? 'md' : 'sm'}
      />
      <div className={showgoTopIcon ? style.goTop : "hide"} onClick={goTopControl}><i className="fas fa-angle-double-up"></i></div>
      <NotificationModal show={notificationShow} onHide={() => setShowNotification(false)} notifications={user ? user.notifications : [] } userId={user ? user._id : ""} />
      {children}
      <Footer showWishlistFooter={showWishlistFooter} isWishlist={isWishlist}/>
      </div>
      
     </>
      
  );
}

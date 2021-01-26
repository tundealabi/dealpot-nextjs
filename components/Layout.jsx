import Head from "next/head";
import { getSession, useSession, signOut } from "next-auth/client";
import { useState } from 'react';
import ModalForm from './ModalForm.jsx';
// import styles from "./layout.module.css";
// import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Header from "./Header.jsx";
import SideNav from './SideNav.jsx';

export default function Layout({ children, props }) {
  console.log("props",props)
  const [session, loading] = useSession();
  const [modalShow, setModalShow] = useState(false);
  const [formContent, setFormContent] = useState("");
  const [showSideNav, setShowSideNav] = useState(false);
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
      <SideNav handleModal={handleModal} displayFormContent={displayFormContent} showSideNav={showSideNav} handleSideNav={setShowSideNav} userSession={{session,loading}}/>
      <Header handleModal={handleModal} displayFormContent={displayFormContent} handleSideNav={setShowSideNav} userSession={{session,loading}}/>
      {/* Modal  */}
      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        formContent={formContent}
        displayFormContent={displayFormContent}
        size={formContent === 'signup' ? 'md' : 'sm'}
      />
      {children}
     </>
      
  );
}

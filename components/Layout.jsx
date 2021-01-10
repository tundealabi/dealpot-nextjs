import Head from "next/head";
// import styles from "./layout.module.css";
// import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Header from "./Header.jsx";



export default function Layout({ children, home }) {
  return (
    <>
      <Head>
      <title>Dealpot</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
    
        <meta name="og:title" content="Dealpot" />
      </Head>
      <Header />
      {children}
     </>
      
  );
}

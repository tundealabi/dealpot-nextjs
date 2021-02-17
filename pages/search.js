import Link from "next/link";
import { useSession } from "next-auth/client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Page from "../components/Page";

const Search = () => {
  const router = useRouter();
 
    
  if(router.query.page == 1 || router.query.page == 0){
    router.query.q ? router.replace(`${router.pathname}?q=${router.query.q}`) : router.replace("/search");
 }

  const pageIndex = Number(router.query.page) ? router.query.page : 1;
  
  
    const [user, setUser] = useState(null);
    const [session, loading] = useSession();
   
    useEffect(()=>{
      // console.log("watching loading")
        if(session){
          setUser(session.user);
        }else{
          setUser(null);
        }
      },[loading]);

    return (
        <Layout>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/"><a>Home</a></Link></li>
                <li className="breadcrumb-item active" aria-current="page">Search results</li>
            </ol>
    </nav>
        <Page user={user} pageIndex={pageIndex} pathName={router.pathname} apiType="api-search" searchTerm={router.query.q ? router.query.q : false } pageType="search"/>
        <div className="hide"><Page user={user} pageIndex={parseInt(pageIndex) + 1} pathName={router.pathname} apiType="api-search" searchTerm={router.query.q ? router.query.q : false} pageType="search"/></div>
    </Layout>
    )
    
}






export default Search;
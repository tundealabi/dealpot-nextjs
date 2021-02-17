import Link from "next/link";
import { useSession } from "next-auth/client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Page from "../../components/Page";

const Category = ({apiType, pageName}) => {
  const router = useRouter();
//   console.log(router)
  if(router.query.page == 1 || router.query.page == 0){
    router.replace(router.query.type);
  }
  const pageIndex = Number(router.query.page) ? router.query.page : 1;
  const pathName = router.query.type;
  
    const [user, setUser] = useState(null);
    const [session, loading] = useSession();
//    console.log("user-type.js",user);
    useEffect(()=>{
      // console.log("watching loading")
        if(session){
          setUser(session.user);
        }else{
          setUser(null);
        }
      },[session]);

    return (
        <Layout>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link href="/"><a>Home</a></Link></li>
                <li className="breadcrumb-item active" aria-current="page">{pageName}</li>
            </ol>
    </nav>
        <Page user={user} pageIndex={pageIndex} pathName={pathName} apiType={apiType} pageType="category"/>
        <div className="hide"><Page user={user} pageIndex={parseInt(pageIndex) + 1} pathName={pathName} apiType={apiType} pageType="category"/></div>
    </Layout>
    )
    
}


export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { type: 'category-automobile' } },
            { params: { type: 'category-baby-product' } },
            { params: { type: 'category-care' } },
            { params: { type: 'category-computing' } },
            { params: { type: 'category-edible' } },
            { params: { type: 'category-electronics' } },
            { params: { type: 'category-fashion' } },
            { params: { type: 'category-home-kitchen' } },
            { params: { type: 'category-office-school' } },
            { params: { type: 'category-phone' } },
            { params: { type: 'category-sports' } },
            { params: { type: 'category-tech-accessories' } },
            { params: { type: 'category-video-game' } }
        ],
        fallback: false
    }
}

export const getStaticProps = async ({ params: { type } }) => {
    switch (type) {
        case 'category-automobile':
            return { props: { apiType: "api-automobile", pageName: "Automobile" } };
        case 'category-baby-product':
            return { props: { apiType: "api-baby", pageName: "Baby Products" } };
        case 'category-care':
            return { props: { apiType: "api-care", pageName: "Health & Beauty" } };
        case 'category-computing':
            return { props: { apiType: "api-computing", pageName: "Computing" } };
        case 'category-edible':
            return { props: { apiType: "api-edible", pageName: "Food & Groceries" } };
        case 'category-electronics':
            return { props: { apiType: "api-electronics", pageName: "Electronics" } };
        case 'category-fashion':
            return { props: { apiType: "api-fashion", pageName: "Fashion" } };
        case 'category-home-kitchen':
            return { props: { apiType: "api-home-kitchen", pageName: "Home & Kitchen" } };
        case 'category-office-school':
            return { props: { apiType: "api-office-school", pageName: "Office & School" } };
        case 'category-phone':
            return { props: { apiType: "api-phone", pageName: "Phone & Tablets" } };
        case 'category-sports':
            return { props: { apiType: "api-sports", pageName: "Sporting Goods" } };
        case 'category-tech-accessories':
            return { props: { apiType: "api-accessories", pageName: "Accessories" } };
        case 'category-video-game':
            return { props: { apiType: "api-games", pageName: "Gaming" } };
    }
    
};

export default Category;
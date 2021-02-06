import { useSession } from "next-auth/client";
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Layout from '../components/Layout.jsx';
// import homepageData from '../lib/homepageData';
import Product from '../components/Product.jsx';
import style from '../styles/Home.module.css';
import { homepageDataApi, homepageTestData } from "../lib/homepageData";


export default function Home({homepageData}) {
  const [user, setUser] = useState(null);
  const [topDeals, setTopDeals ] = useState(homepageData.newDeals);
  const [popularDeals, setPopularDeals ] = useState(homepageData.popularDeals);
  const [session, loading] = useSession();
  const [focused ,setFocus] = useState(false);
  const isTouchScreen = (()=>{
    if(typeof window !== "undefined"){
      return ( 'ontouchstart' in window ) ||  
           ( navigator.maxTouchPoints > 0 ) ||  
           ( navigator.msMaxTouchPoints > 0 );
    }
  })();
  useEffect(()=>{
    if(session){
      setUser(session.user);
    }else{
      setUser(null);
    }
  },[loading])
  const handleClickTop = async(productData,fn,type) => {
    if(user){
      let updatedProduct = await fn(user._id,productData);
      
      let newState = topDeals.map(prod=>{
        if(prod.itemUrl === updatedProduct.itemUrl){
          prod = {...updatedProduct};
        }
        return prod;
      })
      setTopDeals(newState);
    }else{
      let text = type === "wishlist" ? "Login to add this item to your wishlist" : type === "notify" ? "Login to subscribe for notifications for changes in price of this item" : "Login to visit vendor's site";
      toast.dark(text,{
        autoClose: 3000,
        pauseOnFocusLoss: false,
        toastId: "jalingo"
      });
    }
  }
  const handleClickPopular = async(productData,fn,type) => {
    if(user){
      let updatedProduct = await fn(user._id,productData);
      let newState = popularDeals.map(prod=>{
        if(prod.itemUrl === updatedProduct.itemUrl){
          prod = {...updatedProduct};
        }
        return prod;
      })
      setPopularDeals(newState);
    }else{
      let text = type === "wishlist" ? "Login to add this item to your wishlist" : type === "notify" ? "Login to subscribe for notifications for changes in price of this item" : "Login to visit vendor's site";
      toast.dark(text,{
        autoClose: 3000,
        pauseOnFocusLoss: false,
        toastId: "jalingo"
      });
    }
  }
  
  return (
    <Layout focused={focused} deactivateFocus={setFocus}>
      <div className={style.container}> 
        {/* START OF SLIDESHOW AREA */}
          <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="/slide1.png" className="d-block w-100" alt="first slideshow image" />
            <div className="carousel-caption d-md-block">
            <button type="button" className="btn btn-danger" onClick={()=>setFocus(true)}>Get started</button>
      </div>
        </div>
        <div className="carousel-item">
          <img src="/slide2.png" className="d-block w-100" alt="second slideshow image" />
          <div className="carousel-caption d-md-block">
            <button type="button" className="btn btn-danger" onClick={()=>setFocus(true)}>Get started</button>
      </div>
        </div>
        <div className="carousel-item">
          <img src="/slide3.png" className="d-block w-100" alt="third slideshow image" />
          <div className="carousel-caption d-md-block">
            <button type="button" className="btn btn-danger" onClick={()=>setFocus(true)}>Get started</button>
      </div>
        </div>
        <div className="carousel-item">
          <img src="/slide4.png" className="d-block w-100" alt="fourth slideshow image" />
          <div className="carousel-caption d-md-block">
            <button type="button" className="btn btn-danger" onClick={()=>setFocus(true)}>Get started</button>
      </div>
        </div>
      </div>
    </div>
    {/* END OF SLIDESHOW AREA */}
    {/* START OF SUPPORT AREA */}
      <div className={isTouchScreen ? style['supportArea-scrolling-wrapper'] : style.supportArea}>
        <div>
          <span><i className="fas fa-headset"></i></span>
          <div className={style.supportText}>
              <p>24/7 Free Support</p>
              <p>Online Support 24/7</p>
          </div>
            
        </div>
        <div>
          <span><i className="fas fa-headset"></i></span>
          <div className={style.supportText}>
            <p>Compare Deals</p>
            <p>Best Deals Online</p>
          </div>
            
        </div>
        <div>
          <span><i className="fas fa-headset"></i></span>
          <div className={style.supportText}>
          <p>Credible Partners</p>
            <p>Trusted Names</p>
          </div>
            
        </div>
        <div>
          <span><i className="fas fa-headset"></i></span>
          <div className={style.supportText}>
            <p>Special Gift Cards</p>
            <p>Give The Perfect Gifts</p>
          </div>
            
        </div>
      </div>
      {/* END OF SUPPORT AREA */} 

      {/* START OF NEW DEALS AREA */}
      <div className={style.deals}>
          <h3>New Deals</h3>
          <div className={style.productGrid}>
              <Row>
                {topDeals.map(product=> <Col key={product.itemUrl} xs={12} md={4} lg={3}><Product product={product} handleClick={handleClickTop} user={user}/></Col>)}
              </Row>
          </div>
      </div>
      {/* END OF NEW DEALS AREA */}
      {/* START OF POPULAR DEALS AREA */}
      <div className={style.deals}>
          <h3>Popular Deals</h3>
          <div className={style.productGrid}>
              <Row>
                {popularDeals.map(product=> <Col key={product.itemUrl} xs={12} md={4} lg={3}><Product product={product} handleClick={handleClickPopular} user={user}/></Col>)}
              </Row>
          </div>
      </div>
      {/* END OF POPULAR DEALS AREA */}
    </div>
    </Layout>
    
  )
}

export async function getStaticProps() {
  const data = await homepageDataApi();
  const testProduct = await homepageTestData();

  return {
    props: {
      homepageData: {
        newDeals: data.slice(0,4),
        popularDeals: [...data.slice(4,8), ...testProduct]
      }
    },
    revalidate: 40, // In seconds
  }
}
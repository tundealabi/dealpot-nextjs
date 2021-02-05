import { useEffect, useState } from 'react';
import useSWR from "swr";
import fetcher from "../lib/utils/fetcher";
import Loader from "./ContentLoader";
import { Row, Col } from 'react-bootstrap';
import Product from './Product.jsx';
import Pagination from "./Pagination";
import style from '../styles/Page.module.css';
import NoProduct from './NoProduct';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Page = ({user, pageIndex, pathName, apiType, pageType, searchTerm}) => {

    const [ products, updateProducts] = useState(null);
    const swrUrl = pageType === "category" ? `/api/${pageType}/${apiType}?page=${pageIndex}` : `/api/${pageType}/${apiType}?q=${searchTerm}&page=${pageIndex}`;
    const { data, error, isValidating} = useSWR(swrUrl,fetcher,{revalidateOnFocus:false,revalidateOnReconnect:false});
    let loaderQty = ["1a","2b","3c","4d","5e","6f","7g","8h","9i","10j","11k","12l","13m","14n","15o"];
    useEffect(()=>{
      // console.log("watching dataa")
        if(data){
          updateProducts(data.data.result);
        }else if(!data){
          updateProducts(null);
        }
      },[data]);
// console.log(products)
// console.log("data",data)
      const handleClick = async(productData,fn,type) => {
        if(user){
          let updatedProduct = await fn(user._id,productData);
          let newState = products.map(prod=>{
            if(prod.itemUrl === updatedProduct.itemUrl){
              prod = {...updatedProduct};
            }
            return prod;
          })
          updateProducts(newState);
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
        <div className={products ? style.container : style.loaderContainer}>
          
        {
            !products ? 
            <Row>
                {loaderQty.map(loader=> <Col key={loader} xs={6} md={4} lg={3}><Loader uniqueKey={loader}/></Col>)}
              </Row>
            : 
            products.length ? 
            <>
            <Row>
                {products.map(product=> <Col key={product.itemUrl} xs={12} md={4} lg={3}><Product key={product.itemUrl} product={product} handleClick={handleClick} user={user}/></Col>)}
              </Row>
             <Pagination currentPage={pageIndex} limitReached={false} pathName={pathName} pageType={pageType} searchTerm={searchTerm}/> 
              </>
              :
              <NoProduct />
        }
    </div>
      )
}

export default Page;
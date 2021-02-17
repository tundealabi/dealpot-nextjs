import Link from "next/link";
import { getSession } from "next-auth/client";
import { useState, useEffect } from 'react';
import { Col, Row, Modal } from "react-bootstrap";
import Layout from "../../components/Layout";
import NoProduct from "../../components/NoProduct";
import Product from "../../components/Product";
import style from "../../styles/Page.module.css";

const CustomerWishlist = ({ session: { user } }) => {
  // console.log("wishlist-session", user);
  const[wishlist, setWishlist ] = useState(user.savedItems);
  const [show, setShow] = useState(false);
  const [priceHistoryProduct, setPriceHistoryProduct] = useState({priceHistory:[],itemPrice:""});

  const handleClick = async(productData,fn) => {
      let updatedProduct = await fn(user._id,productData);
      if(updatedProduct.showLike){
        let newState = wishlist.map(product => {
            if(product.itemUrl === updatedProduct.itemUrl){
              product.notify = updatedProduct.notify;
              product.showLike = updatedProduct.showLike;
            }
            return product;
        })
        setWishlist(newState);
      }else{
        let findProductIndex = wishlist.findIndex(product => product.itemUrl === updatedProduct.itemUrl);
        let newState = wishlist.slice();
        newState.splice(findProductIndex,1);
        setWishlist(newState);
      }
    }

  const handlePriceHistory = (productUrl) => {
    const product  = wishlist.find(product => product.itemUrl === productUrl);
    
    setPriceHistoryProduct(product);
    setShow(true);
  }

  const PriceHistoryModal = () => (
            <Modal
            show={show}
            onHide={()=>setShow(false)}
            backdrop="static"
            keyboard={false}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Price History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul className="list-group list-group-flush">
              {
                priceHistoryProduct.priceHistory.map((price,index)=><li key={index} className="list-group-item strike-text">{price}</li>)
              }
                <li className="list-group-item">{priceHistoryProduct.itemPrice}</li>
              </ul>
            </Modal.Body>
          </Modal>
  )

  return (
    <Layout showWishlistFooter={wishlist.length > 6 || wishlist.length == 0} isWishlist={true}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Wishlist
          </li>
        </ol>
      </nav>
      <PriceHistoryModal />
      <div className={style.container}>
        {wishlist.length ?
            <Row>
                {wishlist.map(product=> <Col key={product.itemUrl} xs={12} md={4} lg={3}><Product key={product.itemUrl} product={product} handleClick={handleClick} user={user} isWishlist={true} handlePriceHistory={handlePriceHistory}/></Col>)}
              </Row>
              :
              <NoProduct isWishlist={true}/>
              }
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      props: { session },
    };
  }
  return {
    redirect: {
      destination: "/?loginform=yes",
      permanent: false,
    },
  };
};

export default CustomerWishlist;

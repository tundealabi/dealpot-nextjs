import { Card, Button } from 'react-bootstrap';
import style from '../styles/Product.module.css';
import addToFav from '../lib/utils/addFav-helper';
import addToNotify from '../lib/utils/addNotify-helper';

const Product = ({product:{itemImage, vendor, itemName, itemPrice, itemUrl, showLike, notify, sku}, handleClick, user, isWishlist, handlePriceHistory}) => {
    const syncWishlist = user ? user.savedItems.find(product => product.itemUrl === itemUrl) : null;
        if(syncWishlist){
            showLike = syncWishlist.showLike;
            notify = syncWishlist.notify;
        }
    const classes = {
        heart: showLike ? isWishlist ? "fas fa-trash text-danger" : "fas fa-heart text-danger" : "far fa-heart",
        bell: notify ? "fas fa-bell" : "far fa-bell"
    }
    return(
        <div className={isWishlist ? `${style.product} ${style.wishlistProduct}` : style.product}>
            <img src={itemImage}/>
            <div className={style.productDetails}>
            <div>
                <p className="text-muted">{vendor}</p>
                <span onClick={()=>handleClick({itemImage, vendor, itemName, itemPrice, itemUrl, sku}, addToFav, "wishlist")}><i className={classes.heart}></i></span>
            </div>
            <p>{itemName}</p>
            <div>
                <p>{itemPrice}</p>
                <span onClick={()=>handleClick({itemImage, vendor, itemName, itemPrice, itemUrl, showLike, sku},addToNotify, "notify")}><i className={classes.bell}></i></span>
            </div>
            {isWishlist && <Button variant="outline" onClick={()=>handlePriceHistory(itemUrl)} block>Price History</Button> }
            {user ? <Button  href={itemUrl} target="_blank" variant="outline" block>Go to Vendor</Button> : <Button variant="outline" onClick={handleClick} block>Go to Vendor</Button>} 
            </div>
      </div>
    )
}

export default Product;
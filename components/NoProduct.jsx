import Head from "next/head";
import Link from "next/link";
import { Button } from "react-bootstrap";
import style from '../styles/NoProduct.module.css';

const NoProduct = ({isWishlist}) => {
    return (
        isWishlist ? 
        <div className={style.notFound}>
            <div>
                <img src="/binoculars.svg" alt="binoculars" />
            </div>
            <p>You currently do not have any item in your wishlist</p>
            <Link href="/"><a>go to homepage</a></Link>
        </div>
        :
        <>
        <Head>
            <title>No results found!</title>
        </Head>
        <div className={style.notFound}>
            <div>
                <img src="/binoculars.svg" alt="binoculars" />
            </div>
            <p>No results found!</p>
            <p>Unfortunately we couldn't find any product.</p>
            <Link href="/"><a>go to homepage</a></Link>
        </div>
        </>
    )
}

export default NoProduct;
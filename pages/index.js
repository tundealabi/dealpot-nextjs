import Link from 'next/link';
import Layout from '../components/Layout.jsx';
import style from '../styles/Home.module.css';



export default function Home() {
  return (
    <Layout >
      <div className={style.container}>
      <h1> This is the HOMEPAGE!!!!!!</h1>
       <h2>Project features</h2>
       <ul>Logged-in user:</ul>
       <li>Can search for products</li>
       <li>Can find products using the category tab</li>
       <li>Can click on the "go to vendor" button to read more about a product on the vendor's website and can make purchase there</li>
       <li>Can click on the "heart" icon to save an item or remove one</li>
       <li>Can click on the "bell" icon to add an item to "price changed" watchlist or remove</li>
       <li>Can access the wishlist page to view their saved items and from there check the price history if any</li>
       <li>Will receive notification if there is change in price on any product they've added to the watchlist</li>
       <ul>Logged-out user:</ul>
       <li>Can search for products</li>
       <li>Can find products using the category tab</li>
       <li>Can not click on the "go to vendor" button to read more about a product on the vendor's website and can make purchase there</li>
       <li>Can not click on the "heart" icon to save an item or remove one</li>
       <li>Can not click on the "bell" icon to add an item to "price changed" watchlist or remove</li>
       <li>Can not access the wishlist page to view their saved items and from there check the price history if any</li>
       <li>Will not receive notification about changes in product price</li>

       <ul><b>NB:</b>
       <li>This is just a dummy frontend. Will integrate the real frontend when it's ready.</li>
       <li>If you want to test the price history and notification feature, when searching for a product click on the "bell" icon on products with vendor name "Testweb", return to the website later to see the changes.</li>
       <li>Testweb is just a dummy website that was created for the sole purpose of testing out the price history and notification feature for this project.</li>
    </ul>
    </div>
    </Layout>
    
  )
}
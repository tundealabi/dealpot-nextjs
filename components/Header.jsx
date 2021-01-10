import Link from "next/link";
import { Component } from "react";

class Header extends Component {
    state = {
        user: false
    }
    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark ">
            <Link href="/">
            <a className="navbar-brand">Dealpot</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categories
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link href="/category/category-fashion" ><a className="dropdown-item" >Fashion</a></Link>
                    <Link href="/category-edible"><a className="dropdown-item" >Food &amp; Groceries</a></Link>
                    <Link href="/category-care"><a className="dropdown-item" >Health &amp; Beauty</a></Link>
                    <Link href="/category-home-kitchen"><a className="dropdown-item" >Home &amp; Kitchen</a></Link>
                    <Link href="/category-office-school"><a className="dropdown-item" >Office &amp; School</a></Link>
                    <Link href="/category-phone"><a className="dropdown-item" >Phone &amp; Tablet</a></Link>
                    <Link href="/category-computing"><a className="dropdown-item" >Computing</a></Link>
                    <Link href="/category-tech-accessories"><a className="dropdown-item" >Tech Accessories</a></Link>
                    <Link href="/category-electronics"><a className="dropdown-item" >Electronics</a></Link>
                    <Link href="/category-video-game"><a className="dropdown-item" >Gaming</a></Link>
                    <Link href="/category-automobile"><a className="dropdown-item" >Automobile</a></Link>
                    <Link href="/category-baby-product"><a className="dropdown-item" >Baby products</a></Link>
                    <Link href="/category-sports"><a className="dropdown-item" >Sporting Goods</a></Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="">is not available yet</a>
                  </div>
                </li>
              </ul>
              <button type="button" id="notifyBtn" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
               
              </button>
              <form action="/search" method="GET" className="form-inline my-2 my-lg-0" id="search-form">
                <input className="form-control mr-sm-2" type="search" id="search-box" required name="search" placeholder="Search" aria-label="Search" defaultValue="" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              <div className="dropdown user-icon">
                <a className="btn btn-secondary dropdown-toggle" href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {this.user ? `Hi, Jake` : "user option"}
                </a>
              
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {
                        this.state.user ?
                        <>
                        <Link href="#"><a className="dropdown-item" >Account</a></Link>
                        <Link href="/customer/wishlist"><a className="dropdown-item" >Saved Items</a></Link>
                        <hr />
                        <Link href="/customer/logout"><a className="dropdown-item" >LOGOUT</a></Link>
                        </>
                        :
                        <>
                        <Link href="/customer/create"><a className="dropdown-item" >LOGIN</a></Link>
                        <Link href="/customer/account/create"><a className="dropdown-item" >CREATE</a></Link>
                    <hr />
                    <Link href="#"><a className="dropdown-item" >Account</a></Link>
                    <Link href="/customer/account/create"><a className="dropdown-item" >Saved Items</a></Link>
                    </>
                    }
                </div>
              </div>
            </div>
          </nav>
        
        )
    }

}

export default Header;
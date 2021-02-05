import style from "../styles/Footer.module.css";

const Footer = ({showWishlistFooter, isWishlist}) => {
    return (
        <div className={isWishlist ? showWishlistFooter ? style.footer : "hide" : style.footer}>
            <div>
                <img src="/footer_logo.png" alt="footer dealpot logo"/>   
            </div>
            <div>
                <p>Developed with <span>NextJs &amp; ReactJs &copy; 2021</span></p>
                <div>
                    <p>Github: <a href="https://github.com/tundealabi/dealpot-nextjs" target="_blank" ><i className="fab fa-github"></i></a></p>
                    <p>Portfolio: <a href="https://www.notion.so/Alabi-Akintunde-Gregory-ecefe1e2c48f4db09318d9e4ce4ea85d" target="_blank" ><i className="fas fa-id-card-alt"></i></a></p> 
                </div>
                   
            </div>
        </div>
    )
}

export default Footer;
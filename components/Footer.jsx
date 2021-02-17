import style from "../styles/Footer.module.css";

const Footer = ({ showWishlistFooter, isWishlist }) => {
  return (
    <div
      className={
        isWishlist ? (showWishlistFooter ? style.footer : "hide") : style.footer
      }
    >
      <div>
        <img src="/footer_logo.png" alt="footer dealpot logo" />
      </div>
      {/* My Personal stuffs */}
      <div>
        <p>
          Github:{" "}
          <a
            href="https://github.com/tundealabi/dealpot-nextjs"
            target="_blank"
          >
            <i className="fab fa-github"></i>
          </a>
        </p>
        <p>
          Portfolio:{" "}
          <a
            href="https://www.notion.so/Alabi-Akintunde-Gregory-ecefe1e2c48f4db09318d9e4ce4ea85d"
            target="_blank"
          >
            <i className="fas fa-id-card-alt"></i>
          </a>
        </p>
        <p>
          Figma:{" "}
          <a
            href="https://www.figma.com/file/CPdesYTkfupcz4ay8IkJcw/Dealpot-(Group-5)?node-id=377%3A0"
            target="_blank"
          >
            <i className="fab fa-figma"></i>
          </a>
        </p>
      </div>
      <div>
        <p>
          Developed with <span>NextJs &amp; ReactJs &copy; {new Date().getFullYear()}</span>
        </p>
      </div>
      {/* <div>
                    <p>Connect with us</p>
                    <p>
                        <a href="https://www.figma.com/file/CPdesYTkfupcz4ay8IkJcw/Dealpot-(Group-5)?node-id=377%3A0"><i className="fab fa-figma"></i></a>
                        <a href="#"><i className="fab fa-github"></i></a>
                        </p>
                </div>
                <div>
                    <p>Address</p>
                    <p>16A Fola Jinadu Crescent, Gbagada Lagos, Nigeria</p>
                </div> */}
    </div>
  );
};

export default Footer;

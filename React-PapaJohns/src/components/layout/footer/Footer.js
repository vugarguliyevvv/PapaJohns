import SocialLinks from "./SocialLinks";

function Footer() {
  return (
    <footer className="footer">
      <span className="copyright">&copy; PJA 2021</span>
      <div className="footer-info">
        <img
          className="footer-info__image"
          src="assets/img/footer-info.png"
          alt="Info"
        />
      </div>
      <SocialLinks />
    </footer>
  );
}

export default Footer;

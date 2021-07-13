function SocialLinks() {
  return (
    <div className='social'>
      <a className='social-link' href="https://www.facebook.com/papajohns.az/" target="blank">
        <i className="fab fa-facebook-f social-link__icon icon-shown"></i>
        <i className="fab fa-facebook-f social-link__icon icon-hidden"></i>
      </a>
      <a className='social-link' href="https://twitter.com/azpapajohns" target="blank">
        <i className="fab fa-twitter social-link__icon icon-shown"></i>
        <i className="fab fa-twitter social-link__icon icon-hidden"></i>
      </a>
      <a className='social-link' href="https://www.instagram.com/azpapajohns/" target="blank">
        <i className="fab fa-instagram social-link__icon icon-shown"></i>
        <i className="fab fa-instagram social-link__icon icon-hidden"></i>
      </a>
    </div>
  );
}

export default SocialLinks;
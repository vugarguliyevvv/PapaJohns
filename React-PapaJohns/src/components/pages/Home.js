import { useState, useEffect } from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Home() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:22695/api/home')
      .then(response => response.json())
      .then(data => setCarouselItems(data));
  }, []);

  const carousel = carouselItems.map((item) => {
    return (
      <div key={item.id} className="item">
        <img src={`assets/img/slider/${item.image}`} alt={`Slide ${item.id}`} />
      </div>
    );
  });

  return (
    <section className="section-home">
      <OwlCarousel key={Math.random().toString()} items={1} className="owl-theme" loop center autoplay>
        {carousel}
      </OwlCarousel>
    </section>
  );
}

export default Home;

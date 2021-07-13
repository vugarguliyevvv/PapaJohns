import GalleryHeading from "./GalleryHeading";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function BranchGallery({ branch }) {
  const { restaurantImages: gallery } = branch;

  if (!gallery || gallery.length === 0) {
    return (
      <div className='branches__gallery'>
        <GalleryHeading title="Qalereya boşdur" />
      </div>
    );
  }

  const carousel = gallery.map((item, index) => {
    return (
      <div key={item.id} className="item">
        <img src={`assets/img/branches/${item.images}`} alt={`${branch.name} ${index + 1}`} />
      </div>
    );
  });

  return (
    <div className='branches__gallery fade-in'>
      <GalleryHeading title={`${branch.name} Filialı`} />
      <OwlCarousel
        key={Math.random().toString()}
        items={2}
        margin={10}
        className="owl-theme"
        loop
        center
        autoplay
      >
        {carousel}
      </OwlCarousel>
    </div>
  );
}

export default BranchGallery;

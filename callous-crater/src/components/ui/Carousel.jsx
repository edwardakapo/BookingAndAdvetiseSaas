// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'; // Import coverflow effect style

import './css/mainCarousel.css'
import { FreeMode, Autoplay, EffectCoverflow } from 'swiper/modules';

export default function Carousel({images}) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      loop={true}
      loopFillGroupWithBlank={true}
      centeredSlides={true}
      freeMode={true}
      sticky={true}
      grabCursor={true}
      coverflowEffect={{
        rotate: 0, // No rotation
        stretch: 0,
        depth: 100, // Depth effect to move slides
        modifier: 2, // Effect multiplier
        slideShadows: false, // Optional shadows
      }}
      effect={'coverflow'}
    //   cssMode={true}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
      modules={[FreeMode, Autoplay, EffectCoverflow]}
    >
    {images.map((image, index) => (
            <SwiperSlide ke>
              <img 
                  src={image} 
                  alt={`Image ${index + 1}`} 
                  className="swiper__image"
                  onError={ (e)=> handleImageError(e)}
              />
            </SwiperSlide>
    ))}
    </Swiper>
  );
};
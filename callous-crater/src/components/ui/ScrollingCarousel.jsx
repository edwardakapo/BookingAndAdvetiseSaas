import React, { useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './css/mainCarousel.css';


const ScrollingCarousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop : true, dragFree : true}, [Autoplay({delay : "2000"})]);
  const containerRef = useRef(null);

  const handleSelect = useCallback(() => {
    if (!emblaApi) return;
    const slides = emblaApi.slideNodes();
    const selectedIndex = emblaApi.selectedScrollSnap();

    slides.forEach((slide, index) => {
      if (index === selectedIndex) {
        slide.classList.add('embla-Carousel__slide--active');
      } else {
        slide.classList.remove('embla-Carousel__slide--active');
      }
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', handleSelect);
    handleSelect(); // Initial call to set the active slide
  }, [emblaApi, handleSelect]);
  
  return (
    <section className="embla-Carousel">
      <div className="embla-Carousel__viewport" ref={emblaRef}>
        <div className="embla-Carousel__container" ref={containerRef}>
          {images.map((image, index) => (
            <div className="embla-Carousel__slide" key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="embla-Carousel__slide__image"
                onError={(e) => handleImageError(e)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingCarousel;
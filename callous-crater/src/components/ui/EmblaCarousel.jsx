import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = (props) => {
  const {options, images} = props
  const [emblaRef, emblaApi] = useEmblaCarousel({breakpoints: {'(min-width: 1025px)':{ watchDrag: false}}})

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  //Error handling
  const handleImageError = (event) => {
    console.log("ON Error Called")
    event.target.src = "/src/Imageplaceholder.jpg";
  }

  if (!images || images.length === 0) {
    return (
          <div className="embla__error">
            <img src = "/src/Imageplaceholder.jpg"/>
          </div>
          )
  }

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <img 
                  src={image} 
                  alt={`Image ${index + 1}`} 
                  className="embla__slide__image"
                  onError={ (e)=> handleImageError(e)}
              />
            </div>
          ))}
        </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>

    </section>
  )
}

export default EmblaCarousel

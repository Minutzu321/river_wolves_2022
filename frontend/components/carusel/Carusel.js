import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./CaruselButtons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";

const EmblaCarousel = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    skipSnaps: true
  }, [Autoplay({stopOnInteraction: false, stopOnMouseEnter: true})]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((im, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
              <Image
                  src={im.img}
                  alt={im.txt}
                  width={900}
                  height={600}
                />
                <div className="embla__slide__number">{im.txt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};

export default EmblaCarousel;


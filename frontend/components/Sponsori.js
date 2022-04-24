import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export const Sponsori = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, containScroll: "trimSnaps", draggable: false}, [Autoplay({ delay: 1300 })])

  return (
    <div className="embla_sponsori" ref={emblaRef}>
      <div className="embla__container_sponsori">
        <div className="embla__slide_sponsori"><Image src="/sponsori/minerva.png" width={120} height={140}/></div>
        <div className="embla__slide_sponsori"><Image src="/sponsori/cdc.png" width={110} height={120}/></div>
        <div className="embla__slide_sponsori"><Image src="/sponsori/fse.png" width={120} height={80}/></div>
        <div className="embla__slide_sponsori"><Image src="/sponsori/ainodekam.png" width={120} height={80}/></div>
        
      </div>
    </div>
  )
}
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const slides = [
    {lk: "/sponsori/cdc.png", w: 70, h: 100},
    {lk: "/sponsori/fse.png", w: 120, h: 80}, 
    {lk: "/sponsori/minerva.png", w: 250, h: 70},
    {lk: "/sponsori/pickup.png", w: 80, h: 80},
    {lk: "/sponsori/ssorion.png", w: 80, h: 80},
    {lk: "/sponsori/GreenGym.png", w: 200, h: 30}, 
    {lk: "/sponsori/logiscool.png", w: 200, h: 50}, 
    {lk: "/sponsori/ainodekam.png", w: 200, h: 50}, 
    
    
]

const PageFooter = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: false,
        accessibility: false,
        draggable: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              pauseOnHover: false,
              accessibility: false,
              draggable: false,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              pauseOnHover: false,
              accessibility: false,
              draggable: false,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              pauseOnHover: false,
              accessibility: false,
              draggable: false,
            }
          }
        ]
      };

    return (
        <>
        <footer className="footer footer-default">
                <Slider className='s_f_container' {...settings}>
                        {slides.map((img, index) => (
                            <div key={index}>
                                <img
                                className='imgf'
                                src={img.lk}
                                alt="Sponsor"
                                
                                />
                            </div>
                        ))}
                </Slider>
        </footer>
            <footer className="footer footer-default">
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <a href="https://www.instagram.com/sebi.chirus/">
                                Site dezvoltat de Chiruș Mina-Sebastian
                                </a>
                            </li>
                            
                        </ul>
                    </nav>
                    <div className="copyright" id="copyright">
                        © 2022, River Wolves
                    </div>
                </div>
            </footer>
        </>
    )
}

export default PageFooter
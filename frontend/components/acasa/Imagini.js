import Image from "next/image"
import { useState } from "react";
import EmblaCarousel from "../carusel/Carusel"

const imgs = [
    {
        img: "/poze/c25.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c21.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c20.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c19.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c22.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c23.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c24.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c18.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c26.JPG",
        txt: "Nationala 2022"
    },
    {
        img: "/poze/c27.JPG",
        txt: "Treasure Hunt 2021 - Septembrie"
    },
    {
        img: "/poze/c28.JPG",
        txt: "Treasure Hunt 2021 - Septembrie"
    },
    {
        img: "/poze/c14.jpg",
        txt: "Demonstratie 2021"
    },
    {
        img: "/poze/c15.jpg",
        txt: "Demonstratie 2021"
    },
    {
        img: "/poze/c16.webp",
        txt: "Treasure Hunt 2021 - Aprilie"
    },
    {
        img: "/poze/c17.webp",
        txt: "Treasure Hunt 2021 - Aprilie"
    },
    {
        img: "/poze/c1.webp",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c2.webp",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c3.webp",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c5.webp",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c6.webp",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c7.webp",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c8.jpg",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c9.jpg",
        txt: "Demonstratie 2020"
    },
    {
        img: "/poze/c10.jpg",
        txt: "River Wolves Art Challenge"
    },
    {
        img: "/poze/c11.jpg",
        txt: "River Wolves Art Challenge"
    },
    {
        img: "/poze/c12.webp",
        txt: "River Wolves Art Challenge"
    },
    {
        img: "/poze/c13.webp",
        txt: "Prezentare Saptamana Spatiului"
    },
]


const Imagini = () => {
    const [slides, setSlides] = useState(imgs);
    return (
        <div className="section" id="carousel">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-12">
                <EmblaCarousel slides={slides} setSlides={setSlides}/>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Imagini

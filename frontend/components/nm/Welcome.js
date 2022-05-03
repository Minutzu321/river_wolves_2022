import React, { useState } from 'react'
import { ReactP5Wrapper } from "react-p5-wrapper";


// const ReactP5Wrapper = dynamic(() => import('react-p5').then((mod) => mod.default), {
//   ssr: false,
// })
let t = 0;

var settings = {
    meteor: {
       elements: [],
       size: 3,
       theta: Math.PI/6,
       randomTheta: Math.PI/60,
       speed: 5,
       trail: {
          show: true,
          initial: 3,
          length: 40,
          opacity: 128
       },
       create: function(p5,c) {
          settings.meteor.elements.push(new Meteor(p5,c));
       },
       draw: function(p5) {
          for(var i = 0; i < settings.meteor.elements.length; i++) {
             settings.meteor.elements[i].move(p5);
             if(settings.meteor.elements[i].remove) {
                settings.meteor.elements.splice(i, 1);
             }
          }
       }
    },
    general: {
       default: "white",
       colors: {
          "red": {
             fill:[216,51,74],
             stroke:[191,38,60]
          },
          "blue": {
             fill:[93,156,236],
             stroke:[74,137,220]
          },
          "yellow": {
             fill:[255,206,84],
             stroke:[246,187,66]
          },
          "green": {
             fill:[46,204,113],
             stroke:[42,186,102]
          },
          "white": {
             fill:[245,247,250],
             stroke:[230,233,237]
          }
       }
    }
 }
 
 function random(min, max) {
    return Math.random() * (max - min) + min;
  }

 function Meteor(p5,_c) {
    this.x = random(-1*p5.height/2,2*p5.width);
    this.y = settings.meteor.size * -0.5;
    this.px = this.x;
    this.py = this.y;
    this.c = _c == "default" ? settings.general.default : _c;
    

    this.r = settings.meteor.theta + random(-10 * settings.meteor.randomTheta, 10 * settings.meteor.randomTheta)/10;
    this.d = 0;
    this.remove = false;
    
    this.move = function(p5){

       this.px = this.x - Math.sin(this.r)*this.d;
       this.py = this.y + Math.cos(this.r)*this.d;
       
       p5.stroke(0,0,0,0);

       if(settings.meteor.trail.show) {
        p5.fill(settings.general.colors[this.c].fill[0],settings.general.colors[this.c].fill[1],settings.general.colors[this.c].fill[2], settings.meteor.trail.opacity);
        p5.beginShape();
        p5.vertex(this.x - Math.sin(this.r)*(this.d-settings.meteor.trail.length), this.y + Math.cos(this.r)*(this.d-settings.meteor.trail.length));
          var i_r = 90 + this.r;
          p5.vertex(this.px - Math.sin(i_r)*settings.meteor.trail.initial/2, this.py + Math.cos(i_r)*settings.meteor.trail.initial/2);
          p5.vertex(this.px + Math.sin(i_r)*settings.meteor.trail.initial/2, this.py - Math.cos(i_r)*settings.meteor.trail.initial/2);
          p5.endShape();
       }
       
       p5.fill(settings.general.colors[this.c].fill[0],settings.general.colors[this.c].fill[1],settings.general.colors[this.c].fill[2]);
       p5.ellipse(this.px, this.py, settings.meteor.size, settings.meteor.size);
       this.d += settings.meteor.speed;
       this.remove = (this.py > p5.height + settings.meteor.trail.length*2);
    }
 }

let merge = true;

function sketch(p5) {
    p5.setup = () => {
        let canvasDiv = document.getElementById('rw_header');
        if(canvasDiv){
         let width = canvasDiv.offsetWidth;
         let height = canvasDiv.offsetHeight;
         let canvas = p5.createCanvas(width, height);
         canvas.position(0,0)
         canvas.style('z-index', '0');
         p5.noSmooth();
         merge = true;
      }else{
         merge = false;
      }
    }
  
    p5.windowResized = () => {
        let canvasDiv = document.getElementById('rw_header');
        if(canvasDiv){
         let width = canvasDiv.offsetWidth;
         let height = canvasDiv.offsetHeight;
         p5.resizeCanvas(width, height);
         merge = true;
      }else{
         merge = false;
      }
    }

    p5.draw = () => {
      p5.background(0,0,0,0);
      p5.clear()
       if(merge){
         if(t>10){
               t = 0;
               settings.meteor.create(p5, "default");
         }
         t++;
         settings.meteor.draw(p5);
      }
    };
}  


export default function Welcome() {
   const [isVisible, setIsVisible] = useState(true);
    if (typeof window === 'undefined') {
        return <></>
    }else{
	    return <>
        <div className="page-header clear-filter" id="rw_header">
        <div className="page-header-image" data-parallax="true" style={{backgroundImage: 'url("/nmup.jpg")'}}/>
            <div className="container">
                <div className="content-center brand">
                    <img className="rvw-logo" src="rw.png" alt=""/>
                    <h3>Căutare de comori</h3>
                    <h5>Echipa de robotică River Wolves în parteneriat cu Institutul de Cercetări Eco-Muzeale Gavrilă Simion Tulcea</h5>
                    
                    
                </div>
                <img className="nm-logo" src="nmp.png" alt=""/>
                
            </div>
        </div>
        <ReactP5Wrapper sketch={sketch}/>
        </>;
    }
}

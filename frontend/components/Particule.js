import React from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Particule() {

    const particlesInit = async (main) => {
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    

  return (
    <>
    <Particles id="stele"
    init={particlesInit} 
    options={{
      "autoPlay": true,
      "background": {
        "color": {
          "value": "#232741"
        },
        
        "repeat": "no-repeat",
        "size": "20%",
        "opacity": 1
      },
      "backgroundMask": {
        "composite": "destination-out",
        "cover": {
          "color": {
            "value": "#fff"
          },
          "opacity": 1
        },
        "enable": false
      },
      "fullScreen": {
        "enable": false,
        "zIndex": 1
      },
      "detectRetina": true,
      "duration": 0,
      "fpsLimit": 120,
      "interactivity": {
        "detectsOn": "window",
        "events": {
          "resize": true
        },
        "modes": {
          "attract": {
            "distance": 200,
            "duration": 0.4,
            "easing": "ease-out-quad",
            "factor": 1,
            "maxSpeed": 50,
            "speed": 1
          },
          "bounce": {
            "distance": 200
          },
          "bubble": {
            "distance": 250,
            "duration": 2,
            "mix": false,
            "opacity": 0,
            "size": 0,
            "divs": {
              "distance": 200,
              "duration": 0.4,
              "mix": false,
              "selectors": []
            }
          },
          "connect": {
            "distance": 80,
            "links": {
              "opacity": 0.5
            },
            "radius": 60
          },
          "grab": {
            "distance": 400,
            "links": {
              "blink": false,
              "consent": false,
              "opacity": 1
            }
          },
          "light": {
            "area": {
              "gradient": {
                "start": {
                  "value": "#ffffff"
                },
                "stop": {
                  "value": "#000000"
                }
              },
              "radius": 1000
            },
            "shadow": {
              "color": {
                "value": "#000000"
              },
              "length": 2000
            }
          },
          "push": {
            "default": true,
            "groups": [],
            "quantity": 4
          },
          "remove": {
            "quantity": 2
          },
          "slow": {
            "factor": 3,
            "radius": 200
          },
          "trail": {
            "delay": 1,
            "pauseOnStop": false,
            "quantity": 1
          }
        }
      },
      "manualParticles": [],
      "motion": {
        "disable": false,
        "reduce": {
          "factor": 4,
          "value": true
        }
      },
      "particles": {
        "bounce": {
          "horizontal": {
            "random": {
              "enable": false,
              "minimumValue": 0.1
            },
            "value": 1
          },
          "vertical": {
            "random": {
              "enable": false,
              "minimumValue": 0.1
            },
            "value": 1
          }
        },
        "collisions": {
          "bounce": {
            "horizontal": {
              "random": {
                "enable": false,
                "minimumValue": 0.1
              },
              "value": 1
            },
            "vertical": {
              "random": {
                "enable": false,
                "minimumValue": 0.1
              },
              "value": 1
            }
          },
          "enable": false,
          "mode": "bounce",
          "overlap": {
            "enable": true,
            "retries": 0
          }
        },
        "color": {
          "value": "#ffffff",
          "animation": {
            "h": {
              "count": 0,
              "enable": false,
              "offset": 0,
              "speed": 1,
              "decay": 0,
              "sync": true
            },
            "s": {
              "count": 0,
              "enable": false,
              "offset": 0,
              "speed": 1,
              "decay": 0,
              "sync": true
            },
            "l": {
              "count": 0,
              "enable": false,
              "offset": 0,
              "speed": 1,
              "decay": 0,
              "sync": true
            }
          }
        },
        "destroy": {
          "mode": "none",
          "split": {
            "count": 1,
            "factor": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 3
            },
            "rate": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": {
                "min": 4,
                "max": 9
              }
            },
            "sizeOffset": true
          }
        },
        "gradient": [],
        "groups": {},
        "links": {
          "blink": false,
          "color": {
            "value": "#ffffff"
          },
          "consent": false,
          "distance": 150,
          "enable": false,
          "frequency": 1,
          "opacity": 0.4,
          "width": 1,
          "warp": false
        },
        "move": {
          "angle": {
            "offset": 0,
            "value": 90
          },
          "attract": {
            "distance": 200,
            "enable": false,
            "rotate": {
              "x": 600,
              "y": 600
            }
          },
          "center": {
            "x": 50,
            "y": 50,
            "radius": 0
          },
          "decay": 0,
          "distance": {},
          "direction": "none",
          "drift": 0,
          "enable": true,
          "gravity": {
            "acceleration": 9.81,
            "enable": false,
            "inverse": false,
            "maxSpeed": 50
          },
          "path": {
            "clamp": true,
            "delay": {
              "random": {
                "enable": false,
                "minimumValue": 0
              },
              "value": 0
            },
            "enable": false,
            "options": {}
          },
          "outModes": {
            "default": "out",
            "bottom": "out",
            "left": "out",
            "right": "out",
            "top": "out"
          },
          "random": true,
          "size": false,
          "speed": 1,
          "spin": {
            "acceleration": 0,
            "enable": false
          },
          "straight": false,
          "trail": {
            "enable": false,
            "length": 10,
            "fillColor": {
              "value": "#000000"
            }
          },
          "vibrate": false,
          "warp": false
        },
        "number": {
          "density": {
            "enable": true,
            "area": 800,
            "factor": 1000
          },
          "limit": 0,
          "value": 160
        },
        "opacity": {
          "random": {
            "enable": true,
            "minimumValue": 0.1
          },
          "value": {
            "min": 0,
            "max": 1
          },
          "animation": {
            "count": 0,
            "enable": true,
            "speed": 1,
            "decay": 0,
            "sync": false,
            "destroy": "none",
            "startValue": "random",
            "minimumValue": 0
          }
        },
        "reduceDuplicates": false,
        "repulse": {
          "random": {
            "enable": false,
            "minimumValue": 0
          },
          "value": 0,
          "enabled": false,
          "distance": 1,
          "duration": 1,
          "factor": 1,
          "speed": 1
        },
        "rotate": {
          "random": {
            "enable": false,
            "minimumValue": 0
          },
          "value": 0,
          "animation": {
            "enable": false,
            "speed": 0,
            "decay": 0,
            "sync": false
          },
          "direction": "clockwise",
          "path": false
        },
        "shadow": {
          "blur": 0,
          "color": {
            "value": "#000"
          },
          "enable": false,
          "offset": {
            "x": 0,
            "y": 0
          }
        },
        "shape": {
          "options": {},
          "type": "circle"
        },
        "size": {
          "random": {
            "enable": true,
            "minimumValue": 1
          },
          "value": {
            "min": 1,
            "max": 3
          },
          "animation": {
            "count": 0,
            "enable": false,
            "speed": 4,
            "decay": 0,
            "sync": false,
            "destroy": "none",
            "startValue": "random",
            "minimumValue": 0.3
          }
        },
        "stroke": {
          "width": 0
        },
        "zIndex": {
          "random": {
            "enable": false,
            "minimumValue": 0
          },
          "value": 0,
          "opacityRate": 1,
          "sizeRate": 1,
          "velocityRate": 1
        }
      },
      "pauseOnBlur": true,
      "pauseOnOutsideViewport": true,
      "responsive": [],
      "style": {},
      "themes": [],
      "zLayers": 100
    }}/>
    <Particles id="planetute" 
            init={particlesInit} 
            options={
                {
                    "autoPlay": true,
                    "background": {
                      "color": {
                        "value": "#fff"
                      },
                      "image": "",
                      "width": "100%",
                      "height": "100%",
                      "repeat": "no-repeat",
                      "size": "cover",
                      "opacity": 0
                    },
                    "fullScreen": {
                      "enable": false,
                      "zIndex": 1
                    },
                    "detectRetina": true,
                    "duration": 0,
                    "fpsLimit": 60,
                    "interactivity": {
                      "detectsOn": "window",
                      "events": {
                        "resize": true
                      },
                    },
                    "manualParticles": [],
                    "motion": {
                      "disable": false,
                      "reduce": {
                        "factor": 4,
                        "value": true
                      }
                    },
                    "particles": {
                      "bounce": {
                        "horizontal": {
                          "random": {
                            "enable": false,
                            "minimumValue": 0.1
                          },
                          "value": 1
                        },
                        "vertical": {
                          "random": {
                            "enable": false,
                            "minimumValue": 0.1
                          },
                          "value": 1
                        }
                      },
                      
                      "destroy": {
                        "mode": "none",
                        "split": {
                          "count": 1,
                          "factor": {
                            "random": {
                              "enable": false,
                              "minimumValue": 0
                            },
                            "value": 3
                          },
                          "rate": {
                            "random": {
                              "enable": false,
                              "minimumValue": 0
                            },
                            "value": {
                              "min": 4,
                              "max": 9
                            }
                          },
                          "sizeOffset": true
                        }
                      },
                      "move": {
                        "angle": {
                          "offset": 0,
                          "value": 90
                        },


                        "decay": 0,
                        "distance": {},
                        "direction": "none",
                        "drift": 0,
                        "enable": true,
                        "outModes": {
                          "default": "out",
                          "bottom": "out",
                          "left": "out",
                          "right": "out",
                          "top": "out"
                        },
                        "random": false,
                        "size": false,
                        "speed": 1.5,
                        "spin": {
                          "acceleration": 0,
                          "enable": false
                        },
                        "straight": false,
                        "trail": {
                          "enable": false,
                          "length": 10,
                          "fillColor": {
                            "value": "#000000"
                          }
                        },
                        "vibrate": false,
                        "warp": false
                      },
                      "number": {
                        "density": {
                          "enable": true,
                          "area": 800,
                          "factor": 1000
                        },
                        "limit": 0,
                        "value": 10
                      },
                      
                      "rotate": {
                        "random": {
                          "enable": true,
                          "minimumValue": 0
                        },
                        "value": 0,
                        "animation": {
                          "enable": true,
                          "speed": 5,
                          "decay": 0,
                          "sync": false
                        },
                        "direction": "random",
                        "path": false
                      },

                      "shape": {
                        "options": {
                          "image": [
                            {
                              "src": "/planetute/design.png",
                              "width": 64,
                              "height": 64
                            },
                            {
                              "src": "/planetute/mecanica.png",
                              "width": 64,
                              "height": 64
                            },
                            {
                              "src": "/planetute/media.png",
                              "width": 64,
                              "height": 64
                            },
                            {
                              "src": "/planetute/programare.png",
                              "width": 64,
                              "height": 64
                            },
                          ],
                          
                        },
                        "type": "image"
                      },
                      "size": {
                        "random": {
                          "enable": false,
                          "minimumValue": 1
                        },
                        "value": 30,
                        "animation": {
                          "count": 0,
                          "enable": false,
                          "speed": 40,
                          "decay": 0,
                          "sync": false,
                          "destroy": "none",
                          "startValue": "random",
                          "minimumValue": 0.1
                        }
                      },
                      "stroke": {
                        "width": 0,
                        "color": {
                          "value": "#000000",
                          "animation": {
                            "h": {
                              "count": 0,
                              "enable": false,
                              "offset": 0,
                              "speed": 1,
                              "decay": 0,
                              "sync": true
                            },
                            "s": {
                              "count": 0,
                              "enable": false,
                              "offset": 0,
                              "speed": 1,
                              "decay": 0,
                              "sync": true
                            },
                            "l": {
                              "count": 0,
                              "enable": false,
                              "offset": 0,
                              "speed": 1,
                              "decay": 0,
                              "sync": true
                            }
                          }
                        }
                      },
                    },
                    "pauseOnBlur": true,
                    "pauseOnOutsideViewport": true,
                    "zLayers": 1
                  }
            }
            />
            
            </>
  )
}

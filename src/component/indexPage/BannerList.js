import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "../css/styles.css"

const w_banner = [
    {
    image: require('../image/BannerList/1.png'), 
    caption:"Caption",
    description:"Description Here"
    },
    {
      image:require('../image/BannerList/2.png'), 
      caption:"Caption",
      description:"Description Here"
    },
    {
      image:require('../image/BannerList/3.png'), 
      caption:"Caption",
      description:"Description Here"
    } 
  ]
  
   
  const h_banner = [
    {
    image: require('../image/BannerList/1.png'), 
    caption:"Caption",
    description:"Description Here"
    },
    {
      image:require('../image/BannerList/2.png'), 
      caption:"Caption",
      description:"Description Here"
    },
    {
      image:require('../image/BannerList/3.png'), 
      caption:"Caption",
      description:"Description Here"
    } 
  ]
  
  
  
  const Banner = () => {
  
    const [windex, setWindex] = useState(0);
    const [hindex, setHindex] = useState(0);
  
    const w_handleSelect = (selectedWindex, e) => {
      setWindex(selectedWindex);
    };
  
    const h_handleSelect = (selectedHindex, e) => {
      setHindex(selectedHindex);
    };
  
    return (
      <div className="container" style={{ width: "1290px" }}>
        <div className='row'>
       
          <div className='col-lg-4'>
                  <div className="heading-section">
                    <h3>Recently Released</h3>
                  </div>
                  <Carousel activeIndex={hindex} onSelect={h_handleSelect}>
                  {h_banner.map((slide, i) => {
                    return (
                      <Carousel.Item key={i}>     
                        <img
                          style={{ transition: 'none' }}
                          className="d-block w-100"
                          src={slide.image}
                          alt="slider image"
                        />
                        <Carousel.Caption>
                          <h3>{slide.caption}</h3>
                          <p>{slide.description}</p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    )
                  })}
                  </Carousel>
  
          </div>
  
          <div className='row'>
            <div className='col-lg-12'>
                  <div className="heading-section">
                    <h3>Latest Movies Trailer</h3>
                  </div>
            </div>
          </div>        
        </div>
        
        
  
      </div>
    );
  };
  
  export default Banner;
  
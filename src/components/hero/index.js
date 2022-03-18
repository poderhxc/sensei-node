import React, { useRef, useState } from 'react';
import { css } from '@emotion/react';
import { isMobile } from 'react-device-detect';

import media from '../../styles/media';
import Slider from 'react-slick';
import video1 from '../../../public/hero-01.mp4'
import video2 from '../../../public/hero-02.mp4'
import video3 from '../../../public/hero-03.mp4'

import videoMobile1 from '../../../public/hero-1-mobile.mp4'
import videoMobile2 from '../../../public/hero-2-mobile.mp4'
import videoMobile3 from '../../../public/hero-3-mobile.mp4'

const Styles = css`
  background: #0C0C0C;
  z-index: 2;
  position: relative;
  height:  100vh;
  position: relative;
  z-index: 4;
  section {
    height: 100vh;
  }
  .slick-slider {height: 100%;}
  h1 {
    font-size: 4rem;
    text-align: center;
    color: #fff;
    z-index: 3;
    font-weight: 100;
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
    color: #fff;
    z-index: 3;
    font-weight: 100;
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height:100%;
    width:100%;
  }

  .hero-image {
    max-width: 100%;
  }

  .hero-image-mobile {
    display:none;
  }
  .slick-arrow {
    display: none!important;
  }
  .hero-3 {
    position:relative;
    .container {
      position: absolute; 
      top: 0;
      left:0;
      right:0;
      width:100vw;
    }
    
    h1 {
      margin-top:50px;
      margin-bottom:20px;
    }
  }
  .hero-2 {
    position:relative;
  }

  .float-left {
    align-self:flex-start;
    text-align:left;
    max-width: 600px;
    margin-bottom: 200px;
    margin-top: 0;
  }

  .float-right {
    float:right;
    text-align:right;
    align-self:flex-end;
  }
  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .hero-slide {
    position: relative;
    .container {
      position:absolute;
      top:0;
      left:0;
      right:0;
    }
  }
  ${media.medium} {
    .hero-slide {
      padding-left: 0;
      padding-right: 0;
      video {
        width:100vw
      }
    }

    padding-top: 0;
    height: calc(100vh);
    .hero-3 {
      background-size: cover;
    }
    
    .background {
      width: 80%;
      height: 200px;
      margin: auto;
    }

    br {display:none;}

    .title {
      width: 100%;
      overflow: hidden;
      padding: 0 40px;
    }

    .hero-image-mobile {
      display: block;
    }

    .hero-image {
      display:none;
    }

    h1 {
      font-size: 3.5rem;
      width: 100%;
      text-align: center;
      margin-bottom:50px;
    }
    h2 {
      font-size: 2rem;
      padding: 0 30px;
      line-height: 2.5rem;
    }
  }
`;

const Hero = () => {
  const [ replayVideo, setReplayVideo ] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      setReplayVideo(newIndex);
    }
  };

  return (
    <div css={[Styles]}>
      <Slider {...settings}>
        <section className="hero-slide hero-3" >
          <video playsInline autoPlay muted loop>
            <source src={isMobile ? videoMobile1 : video1} type="video/mp4" />
          </video>
          <div className="container">
            <div className="title">
              <div>
                <h1>We are building the backbone for a <br/>decentralized Blockchain in Latin America.</h1>
                <h2>Distributed across multiple leading local hosting providers all over the region.</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="hero-slide hero-2" >
          { replayVideo === 1 && (<video playsInline autoPlay muted>
            <source src={isMobile ? videoMobile2 : video2} />
          </video>) }

          <div  className="container">
            <div  className="title">
                <h1 className="float-left">Enterprise level <br/>Blockchain infrastructure</h1>
                <h1 className="float-right">Made simple.</h1>
            </div>
          </div>
        </section>

        <section className="hero-slide hero-1"  >
        {  replayVideo === 2 && (<video playsInline autoPlay muted>
            <source src={isMobile ? videoMobile3 : video3} type="video/mp4" />
          </video>) }
          <div className="container">
            <div className="title">
                <h1>The Revolution will be Decentralized.</h1>
                <div>
                  <h1>Own your node.</h1>
                  <h2>Accesible and reliable one-click private nodes for everybody.</h2>
                </div>
            </div>
          </div>
        </section>
      </Slider>
    </div>

  );
}

export default Hero;


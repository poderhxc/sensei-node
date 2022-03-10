import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';
import Slider from 'react-slick';
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
    background: url('https://i3.lensdump.com/i/rvh3L5.jpg');
    background-size: 130%;
    background-repeat: no-repeat;
    background-position: center;
    
    h1 {
      margin-top:50px;
      margin-bottom:20px;
    }
  }
  .hero-2 {
    background: url('https://i.lensdump.com/i/rvh4az.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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

  ${media.medium} {
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
    .hero-2, .hero-3, .hero-1 {
      padding-left: 40px!important;
      padding-right: 40px!important;
    }

    .title {
      width: 100%;
      overflow: hidden;
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div css={[Styles]}>
      <Slider {...settings}>
        <section className="hero-3" >
          <div className="container">
            <div className="title">
              <div>
                <h1>We are building the backbone for a <br/>decentralized Blockchain in Latin America.</h1>
                <h2>Distributed across multiple leading local hosting providers all over the region.</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="hero-2" >
          <div  className="container">
            <div  className="title">
                <h1 className="float-left">Enterprise level <br/>Blockchain infrastructure</h1>
                <h1 className="float-right">Made simple.</h1>
            </div>
          </div>
        </section>

        <section  className="hero-1"  >
          <div  className="container">
            <div  className="title">
                <h1>The Revolution will be Decentralized.</h1>
                <img  className="hero-image" src="https://i1.lensdump.com/i/ref1se.png" />
                <img  className="hero-image-mobile" src="https://i.lensdump.com/i/rnJTvP.png" />
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


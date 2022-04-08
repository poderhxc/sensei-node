import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';
import borderless from '../../../public/borderless-capital.png';
import newtopia from '../../../public/newtopia.png';
import sur from '../../../public/sur-ventures.png';
import spice from '../../../public/spice.png';
import dg from '../../../public/dg.png';
import xeibo from '../../../public/xeibo-capital.png';
import CircleIcon from '../../../public/circle-icon.svg';
import { useParams } from 'react-router-dom';
import i18n from '../../i18n';

const Styles = css`
  z-index: 3;
  position: relative;


  .green-pill {
    background: #34C55D;
    padding: 5px 20px;
    border-radius: 30px;
    font-weight:100;
    color: #fff;
    margin:30px 0;
    font-size: 1.3rem;  
  }

  h3 {
    font-size: 1.8rem;
    width: 100%;
    text-align: center;
    font-weight: 100;
    line-height: 3rem;
    padding-bottom: 30px;
  }

  h2 {
    font-size: 2.5rem;
    width: 400px;
    font-weight: 100;
    line-height: 3rem;
    padding-bottom: 0;
  }

  .container-rounded {
    background: #F6F6F6;
    border-radius:30px;
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .logos-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 60px 100px;
    :after{
      content:'';
      width: 30%;
    }
    .logo{
      width: 30%;
      border-top: 2px solid #E3DFDF;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      img {
        width:60%;
      }
      a {
        font-size: 1.3rem;
        display:flex;
        img {
          width:250px;
          margin:auto;
        }
      }
    }
  }
  .icon{
    position:absolute;
    right: 100px;
    width: 300px;
    bottom: -150px;
  }
  ${media.medium} {
    h2 {
      width: 80%;
      font-size: 2rem;
    }
    h3 {
      font-weight:400;
      font-size:1.8rem;
    }
    .green-pill {
      font-size: 1.8rem;
      font-weight: 400;
    }
    .container-rounded {
      background: transparent;
    }
    .logos-container {
      padding-bottom: 30px;
      .logo {
        width: 100%;
        a {
          font-size: 1.5rem;
        }
      }
    }
    .icon {
      width: 50%;
    }
  }
`;

const Investors = () => {
  let { locale } = useParams();
  locale = locale || 'us';

  return (
    <div css={[Styles]}>
      <div className="container">
        <div className="container-rounded">
          <span className="green-pill" dangerouslySetInnerHTML={i18n(locale, 'investors-title')} />

          <h2 dangerouslySetInnerHTML={i18n(locale, 'investors-subtitle')} />

          <h3 dangerouslySetInnerHTML={i18n(locale, 'investors-subtitle-2')} />
          <div className="logos-container">
            <div className="logo">
              <a target="_blank" href="https://www.borderlesscapital.io/">
                <img alt="borderless"  src={borderless} />
              </a>
            </div>
            <div className="logo">
              <a target="_blank" href="https://newtopia.vc/">
                <img alt="newtopia"  src={newtopia} />
              </a>
            </div>
            <div className="logo">
              <a target="_blank" href="https://sur.vc/">
                <img alt="sur"  src={sur} />
              </a>
            </div>
            <div className="logo">
              <a target="_blank" href="https://spicevc.com/">
                <img alt="spice" src={spice} />
              </a>
            </div>
            <div className="logo">
              <a target="_blank" href="https://www.11-11dg.partners/">
                <img alt="dg" src={dg} />
              </a>
            </div>
            <div className="logo">
              <a target="_blank" href="https://xeibocapital.com/">
                <img alt="xeibo" src={xeibo} />
              </a>
            </div>
          </div>

          <h3 dangerouslySetInnerHTML={i18n(locale, 'investors-subtitle-3')} />
          <div className="logos-container">
            <div className="logo">
              <a href="https://www.linkedin.com/in/abarmat/">Ariel Barmat</a>
            </div>
            <div className="logo">
              <a href="#">Ariel Schapira</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/eordano/">Esteban Ordano</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/fgarreton/">Facundo Garreton</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/franciscoalvarezdemalde/">Francisco Alvarez-Demalde</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/jamesfinn/">Jamie Finn</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/jvillamizar/">Javier Villamizar</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/marcosgalperin/">Marcos Galperin</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/migoya/">Martin Migoya</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/matiaswoloski/">Matias Woloski</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/miguelsantosw/">Miguel Santos</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/orlandopablo/">Pablo Orlando</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/rodrigoteijeiro/">Rodrigo Tejeiro</a>
            </div>
            <div className="logo">
              <a href="https://www.linkedin.com/in/ryanfloyd1/">Ryan Floyd</a>
            </div>
          </div>
        </div>

      </div>
      <img src={CircleIcon} className="icon" />

  </div>
  );
}
export default Investors;

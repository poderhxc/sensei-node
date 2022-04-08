import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';
import { useParams } from 'react-router-dom';
import i18n from '../../i18n';
import bottomLines from '../../../public/bottom-lines.png';
import bottomCircles from '../../../public/bottom-circles.png';

const Styles = css`
  z-index: 3;
  position: relative;
  
  .container {
    align-items: center;
    justify-content: center;
  }

  .black-container {
    width:100%;
    background: #1D1D1D;
    padding: 40px;
    flex-grow: 1;
    padding-bottom:200px;
    h2 {
      font-size: 2.5rem;
      line-height: 3.3rem;
      color: #fff;
      z-index: 3;
      font-weight: 100;
      text-align: left;
    }
  }

  .green-container {
    color: #fff;
    font-size: 1.3rem;
    text-align: center;
    font-weight: 100;
    width:100%;
    background: #34C55D;
    padding: 20px;
    flex-grow: 1;
    display:flex;
    align-items: center;
    line-height: 1.5rem;
  }

  .rounded-box {
    margin-top: -60px;
    margin-bottom: -300px;
    margin-left: 350px;
    display: flex;
    align-items: stretch;
    width: 750px;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
  }

  .btm-lines {
    width: 180px;
  }

  .mid-circles { 
    position: relative;
    width: 200px;
    margin-left:75px;
  }
  .bold {
    font-weight: 600;
  }
  .green { color: #34C55D }

  .image-container { 
    padding:30px;
    display:flex; 
    flex-direction: row;
    align-items: end; 
    -webkit-align-items: flex-end;
    width: 750px;
    position: absolute;
    bottom:0;
  }

  ${media.medium} {
    .rounded-box {
      width:100%;
      max-width: 400px;
      flex-direction: column;
      margin: 10px;
      margin-top: 100px;
      margin-bottom: 30px;
      border-radius: 15px;
      .green-container {
        border-radius: 15px 15px 0 0;
        padding: 120px 50px;
        font-size: 1.5rem;
        margin-top: -15px;
        line-height: 2.3rem;
      }

    }
    .image-container {
      top:230px;
      width:100%; 
      bottom:unset;
      padding: 10px;
      .mid-circles {
        width: 70%;
        margin-left: -30px;
      }
      .btm-lines {
        width:40%;
        max-height: 33px;
        height:33px;
      }
    }
  }
`;

const OnboardingProcess = () => {
  let { locale } = useParams();
  locale = locale || 'us';

  return (
    <div css={[Styles]}>
      <div className="container">
        <div className="rounded-box">
          <div className="black-container">
            <h2 dangerouslySetInnerHTML={i18n(locale, 'onboarding-process-left')} />
          </div>
          <div className="green-container" dangerouslySetInnerHTML={i18n(locale, 'onboarding-process-right')} />
            
          <div className="image-container">
            <img className="btm-lines" src={bottomLines} />
            <img className="mid-circles" src={bottomCircles} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingProcess;


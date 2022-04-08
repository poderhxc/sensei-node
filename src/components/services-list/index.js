import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import i18n from '../../i18n';

import { css } from '@emotion/react';
import media from '../../styles/media';
import ExchangesIcon from '../icons/exchanges';
import BlockchainIcon from '../icons/blockchain';
import TokenHoldersIcon from '../icons/token-holders';
import BanksIcon from '../icons/banks';
import { isMobile } from 'react-device-detect';

const Styles = css`
  z-index: 3;
  position: relative;

  .contact-button {
    background: #34C55D;
    border-radius: 35px;
    padding: 15px 40px;
    font-size: 1.6rem;
    align-self: flex-end;
    margin: 0 auto;
    color: #fff;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 3.3rem;
    color: #fff;
    z-index: 3;
    font-weight: 100;
    text-align: left;
    padding-bottom: 0;
  }
  .highlight { 
    border:1px solid #fff;
    border-radius: 30px;
    padding: 5px 15px;
  }
  .services-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 80px;
  }
  .service-box {
    width: 30%;
    border-top: 3px solid #34C55D;
    margin-top: 20px;
    margin-right: 20px;

    &:last-of-type {
      margin-bottom: 2rem;
    }

    p {
      color: #BABABA;
      font-size: 1.2rem;
      line-height: 1.8rem;
      transition: all 1s;
    }
    h3 {
      font-size: 2.5rem; 
      color: #fff;
      font-weight: 600;
      padding: 0;
    }
    h4 {
      font-size: 1.4rem; 
      color: #fff;
      font-weight: 400;
      line-height: 1.8rem!important;
      padding: 0;
    }
    .title-container {
      display: flex;
      margin-bottom: 20px;
      padding: 20px 0;
      .title-icon {
        background: #14302B;
        border-radius: 60px;
        padding: 10px;
        height: 45px;
        width: 45px;
        display: flex;
        align-items: center; 
        justify-content: center;
      }
    }
  }
  .blank {
    width: 30%;
    margin-right: 20px;
    display:flex;
  }
  ${media.medium} {
    padding: 40px;
    .services-list {
      flex-direction: column;
      .service-box {
        width: 100%;
        &.open {
          .title-container:before {
            transform: rotate(225deg) translateY(-10px) translateX(-10px);
          }
          p {
            max-height:2000px; 
          }
        }
        .title-container {
          position: relative;
          flex-direction: row-reverse;
          h3 {
            font-size: 2rem;
          }
          .title-icon {
            margin-right: 10px;
          }
          &:before {
            content: '';
            min-width:15px;
            min-height: 15px;
            width:15px;
            height: 15px;
            transform: rotate(45deg);
            border-bottom: 2px solid #fff;
            transition: all 0.4s; 
            border-right: 2px solid #fff;
            position:absolute;
            top: 25px;
          }
        }
        p {
          max-height:0;
          overflow: hidden;
        }
      }
    }
    .blank {
      display:none;
    }
  }
`;

const services = [
  {
    title: "exchanges-title",
    icon: <ExchangesIcon />,
    text: "exchanges-text",
  },
  {
    title: "token-holders-title",
    icon: <TokenHoldersIcon />,
    text: "token-holders-desc",
  },
  {
  },
  {
    button: {
      link: 'https://us5.list-manage.com/contact-form?u=9a345a8d92f88e03240efcfb6&form_id=d832bc00fc84c97d62fa9aa05161379d ',
      button_text: 'contact-us'
    }
  },
  {
    title: "blockchain-protocol-title",
    icon: <BlockchainIcon />,
    text: "blockchain-protocol-desc",
  },
  {
    title: "banks-title",
    icon: <BanksIcon />,
    text: "banks-desc",
  },
];

const Service = ({title, icon, text, button = {}}) => {
  let { locale } = useParams();
  locale = locale || 'us';

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (e) => { setIsOpen(!isOpen); }
  const { button_text, link } = button;
  let className = `service-box ${isOpen ? 'open' : ''}`;

  useEffect(() => {
    className =  `service-box ${isOpen ? 'open' : ''}`;
  }, [isOpen]);

  
  return title ? (
    <div onClick={handleOpen} className={className}>
      <div className="title-container">
        <h3 dangerouslySetInnerHTML={i18n(locale, title)} />
        <div className="title-icon">
          {icon}
        </div>
      </div>
      <p dangerouslySetInnerHTML={i18n(locale, text)} />
    </div> ) : ( button_text ? ( 
    <div className="blank">
      <a className="contact-button" target="_blank" href={link} dangerouslySetInnerHTML={i18n(locale, 'contact-us')} />
    </div> ) : (
    <div className="blank"></div>
    )
  ) 
};

const ServicesList = () => {
  let { locale } = useParams();
  locale = locale || 'us';
  
  return (
    <div id="services" css={[Styles]}>
      <div className="container">
        <div>
          <h2 dangerouslySetInnerHTML={i18n(locale, 'services-title')} />

          <div className="services-list">
            { services.map((service, index) => <Service key={index} {...service} />) }
            { isMobile && <a  className="contact-button"  href="https://us5.list-manage.com/contact-form?u=9a345a8d92f88e03240efcfb6&form_id=d832bc00fc84c97d62fa9aa05161379d" target="_blank"  dangerouslySetInnerHTML={i18n(locale, 'contact-us')} /> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesList;

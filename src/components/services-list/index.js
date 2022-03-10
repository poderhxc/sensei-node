import React from 'react';
import { useState, useEffect } from 'react';

import { css } from '@emotion/react';
import media from '../../styles/media';
import ExchangesIcon from '../icons/exchanges';
import BlockchainIcon from '../icons/blockchain';
import TokenHoldersIcon from '../icons/token-holders';
import BanksIcon from '../icons/banks';

const Styles = css`
  z-index: 3;
  position: relative;

  .contact-button {
    background: #34C55D;
    border-radius: 35px;
    padding:5px 40px;
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
    title: "Exchanges",
    icon: <ExchangesIcon />,
    text: `We enable exchanges to increase their digital assets offering, 
      or scale their existing one, by providing access to multiple blockchain protocols without the 
      need for specialized in-house node deployment and management capabilities. Easily access protocol
      data without the challenge and cost of launching a full archive node.`,
  },
  {
    title: "Token Holders",
    icon: <TokenHoldersIcon />,
    text: `We empower token holders with direct access to validator nodes on the main 
      Proof-of Stake protocols. Staking your funds on SenseiNode increases your share
      on rewards earned by your validator nodes compared to staking on Exchanges, 
      with no slashing and guaranteed uptime across all networks.`,
  },
  {
  },
  {
    button: {
      link: 'https://us5.list-manage.com/contact-form?u=9a345a8d92f88e03240efcfb6&form_id=d832bc00fc84c97d62fa9aa05161379d ',
      button_text: 'Contact Us'
    }
  },
  {
    title: "Blockchain Protocol Foundations",
    icon: <BlockchainIcon />,
    text: `SenseiNode can help you build the infrastructure that would drive the growth 
      of your community and adoption of the protocol in Latin America. We ensure a 
      decentralized deployment by using multiple local hosting providers across all the regions.`,
  },
  {
    title: "Banks, Custodians",
    subtitle: "& other Financial Institutions",
    icon: <BanksIcon />,
    text: `We help banks and other financial institutions to extend crypto investment 
      services to their customers, providing access to staking nodes on Proof-of-Stake protocols
      while maintaining the custody and full control of their funds.`,
  },
];

const Service = ({title, subtitle, icon, text, button = {}}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (e) => { setIsOpen(!isOpen); }
  const { button_text, link } = button;
  let className = `service-box ${isOpen ? 'open' : ''}`;

  useEffect(() => {
    className =  `service-box ${isOpen ? 'open' : ''}`;
  }, [isOpen]);

  
  return title ? (
    <div onClick={handleOpen} class={className}>
      <div class="title-container">
        <h3>
          {title}
          { subtitle && (<h4>{subtitle}</h4>)}
        </h3>
        <div class="title-icon">
          {icon}
        </div>
      </div>
      <p>{text}</p>
    </div> ) : ( button_text ? ( <div className="blank"><a className="contact-button" target="_blank" href={link}>{button_text}</a></div>) :
        (<div className="blank"></div>)
      ) 
};

const ServicesList = () => {
  return (
    <div id="services" css={[Styles]}>
      <div class="container">
        <h2>
          <span className="highlight">Sensei Node</span> is for
          
          <div class="services-list">
            {services.map( (service) => <Service {...service} />)}
          </div>
        </h2>
      </div>
    </div>
  );
}

export default ServicesList;


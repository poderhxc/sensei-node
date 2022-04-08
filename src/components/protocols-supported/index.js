import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';
import { useParams } from 'react-router-dom';
import i18n from '../../i18n';

import solana from '../../../public/protocols/solana.png';
import ethereum from '../../../public/protocols/ethereum.png';
import kusama from '../../../public/protocols/kusama.png';

import bitcoin from '../../../public/protocols/bitcoin.png';
import algorand from '../../../public/protocols/algorand.png';
import celo from '../../../public/protocols/celo.png';
import polkadot from '../../../public/protocols/polkadot.png';
import avalanche from '../../../public/protocols/avalanche.png';
import polygon from '../../../public/protocols/polygon.png';
import fantom from '../../../public/protocols/fantom.png';
import cosmos from '../../../public/protocols/cosmos.png';

const Styles = css`
  z-index: 3;
  position: relative;

  .container {
    display: flex;
    align-items: stretch;
  }

  h2 {
    color: #D7DFD6;
    text-align: left;
    font-weight: 400;
    font-size: 2.8rem;
    line-height: 3.5rem;
    width: 40%;
    padding-bottom: 0;
    padding-right: 100px;
  }
  
  .green {
    color: #34C55D;
    display:block;
    padding-right: 80px;
    margin-bottom: 30px;
    font-size: 4rem;
    line-height: 4.6rem;
  }

  .logos-container {
    display: flex;
    flex-wrap: wrap;
    width: 60%;
    justify-content: space-between;
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
        max-width: 100%;
      }
    }
  }

  ${media.medium} {
    .container {
      flex-direction: column;
      padding:40px;
      h2 {
        padding:0;
        width:100%;
      }
    }
    .logos-container {
      margin-top: 100px;
      width:100%;
      justify-items: space-between;
      .logo {
        width: 47%;

      }
    }
  }
`;

const ProtocolsSupported = () => {
  let { locale } = useParams();
  locale = locale || 'us';

  return (
    <div css={[Styles]}>
      <div className="container">
        <h2 dangerouslySetInnerHTML={i18n(locale, 'protocols-title')} />
        <div className="logos-container">
          <div className="logo">
            <img alt="solana" src={solana} />
          </div>

          <div className="logo">
            <img alt="ethereum" src={ethereum} />
          </div>

          <div className="logo">
            <img alt="kusama" src={kusama} />
          </div>

          <div className="logo">
            <img alt="bitcoin" src={bitcoin} />
          </div>

          <div className="logo">
            <img alt="algorand" src={algorand} />
          </div>

          <div className="logo">
            <img alt="celo" src={celo} />
          </div>

          <div className="logo">
            <img alt="polkadot" src={polkadot} />
          </div>

          <div className="logo">
            <img alt="avalanche" src={avalanche} />
          </div>

          <div className="logo">
            <img alt="polygon" src={polygon} />
          </div>

          <div className="logo">
            <img alt="fantom" src={fantom} />
          </div>

          <div className="logo">
            <img alt="cosmos" src={cosmos} />
          </div>

          <div className="logo"></div>
        </div>
      </div>
    </div>
  );
}

export default ProtocolsSupported;


import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';

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
  return (
    <div css={[Styles]}>
      <div class="container">
        <h2>
          <span className="green">
            Protocols Supported
          </span>
          We currently support SenseiNodes on the following protocols:
        </h2>
        <div className="logos-container">
          <div className="logo">
            <img alt="solana" src="https://i3.lensdump.com/i/re5xMQ.png" />
          </div>

          <div className="logo">
            <img alt="ethereum" src="https://i.lensdump.com/i/reG8tH.png" />
          </div>

          <div className="logo">
            <img alt="kusama" src="https://i2.lensdump.com/i/re5azk.png" />
          </div>

          <div className="logo">
            <img alt="bitcoin" src="https://i2.lensdump.com/i/reGWPc.png" />
          </div>

          <div className="logo">
            <img alt="algorand" src="https://i1.lensdump.com/i/re5G6e.png" />
          </div>

          <div className="logo">
            <img alt="celo" src="https://i3.lensdump.com/i/re5hbx.png" />
          </div>

          <div className="logo">
            <img alt="polkadot" src="https://i1.lensdump.com/i/reGAK1.png" />
          </div>

          <div className="logo">
            <img alt="avalanche" src="https://i.lensdump.com/i/re5yaa.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtocolsSupported;


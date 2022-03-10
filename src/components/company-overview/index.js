import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';

const Styles = css`
  z-index: 1;
  position: relative;
  .gray-background-round {
    margin-top: -250px;
    background: #EEE;
    padding:300px 120px 120px;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    z-index: 1;
    &:after{
      content: '';
      width: 100%;
    }
  }

  p {
    margin-top: 20px;
  }

  .tag {
    background: #000;
    color: #fff;
    border-radius: 60px;
    padding: 5px 10px;
    font-size: 1.2rem;
  }
  
  .content-left {
    width: 100%;
    font-size: 2rem;
    line-height: 3rem;
    .blue-line { color: blue; }
  }

  ${media.medium} {
    .tag {
      font-size: 1.4rem;
      padding: 10px 20px;  
    }
    .content-left {
      font-size: 1.5rem;
      line-height: 2rem;
      padding-right: 40px;
    }
    .gray-background-round {
      margin:-100px 20px;
      padding:100px 10px;
      border-radius: 0;
      &:after{
        content: none;
        width: 100%;
      }
    }
  
  }
`;

const CompanyOverview = () => {
  return (
    <div id="about-us" css={[Styles]}>
      <div class="container">
        <div class="gray-background-round">
          <div class="content-left">
            <span class="tag">
              Company Overview
            </span>

            <p>
              We drive the decentralization of the blockchain
              ecosystem in Latin America with a <span class="blue-line">simple, 
              scalable and secure</span> node management platform.
              Our nodes provide enterprise level availability,
              distributed on leading hosting facilities locally on
              each market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyOverview;


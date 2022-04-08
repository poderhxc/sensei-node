import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';
import { useParams } from 'react-router-dom';
import i18n from '../../i18n';

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
  let { locale } = useParams();
  locale = locale || 'us';

  return (
    <div id="about-us" css={[Styles]}>
      <div className="container">
        <div className="gray-background-round">
          <div className="content-left">
            <span className="tag" dangerouslySetInnerHTML={i18n(locale, "company-overview-title")} />
        
            <p dangerouslySetInnerHTML={i18n(locale, "company-overview-desc")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyOverview;


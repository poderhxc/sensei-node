import React from 'react';
import { css } from '@emotion/react';
import media from '../styles/media';

const footerStyle = css`
  padding: 20px;
  background: #3F3FF9;

  & > nav {
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .social-container {
      display: flex;
      flex-direction: column;
      span {
        font-size: 1.2rem;
        margin-bottom: 20px;
        color: #C4C4C4;
      }
      .social-buttons {
        margin-bottom: 10px;
        a { margin-right: 15px; }
      }
      .terms {
        a {
          margin-right:60px;
          text-decoration: underline;
        }
      }
    }
  }

  .contact-button {
    background: #34C55D;
    border-radius: 35px;
    padding:15px 40px;
    font-size: 1.6rem;
    align-self: flex-start;
    color: #fff;
    margin-bottom: 40px;
  } 
  svg {
    fill: #ededed;
  }
  ${media.medium} {
    nav {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .sensei-logo-container {
        margin-bottom: 40px;
      }
    }
  }
`;

const Footer = () => {
  return (
    <footer css={[footerStyle]}>
      <nav>
        <div className="sensei-logo-container">
          <img src="https://i3.lensdump.com/i/reGyIC.png"/>
        </div>
        <div className="social-container"> 
          <span>Connect with Sensei Node</span>
          <div className="social-buttons">
            <a href="https://twitter.com/SenseiNode" target="_blank">
              <img src="https://i1.lensdump.com/i/reGGoz.png" />
            </a>
            <a href="https://www.linkedin.com/company/senseinode?originalSubdomain=ar" target="_blank">
              <img src="https://i2.lensdump.com/i/reGh8T.png" />
            </a>

            <a href="https://github.com/Sensei-Node" target="_blank">
              <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
          </div>
          <a className="contact-button" href="https://us5.list-manage.com/contact-form?u=9a345a8d92f88e03240efcfb6&form_id=d832bc00fc84c97d62fa9aa05161379d" target="_blank">
            Contact Us
            </a>
          <div className="terms">
            <a href="#"> Privacy Policy</a>
            <a href="#"> Terms & conditions </a>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

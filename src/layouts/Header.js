import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import i18n from '../i18n';

import media from '../styles/media';
import { palette } from '../styles/palette';
import { useThemeContext } from '../contexts/ThemeContext';
import { HashLink as Link } from 'react-router-hash-link';
import senseiLogo from '../../public/sensei-logo-white.png';

const Header = () => {
  let { locale } = useParams();
  locale = locale || 'us';

  const { pathname } = useLocation();
  const { isLight, toggleTheme } = useThemeContext();
  const [ menuOpened, setMenuOpened ]= useState(false);

  const handleToggleMenu = () => {
    setMenuOpened(!menuOpened);
  }
  const headerStyle = (isLight) => css`
    height: 100px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

    .menu-container a {
      color: #ffc515;
      padding: 10px 15px;
    }
    .logo-container {
      max-width: 420px;
      img {
        max-width:100%;
      }
    }
    .menu {
      ul {
        display:flex;
        li {
          margin: 0 10px;
          text-align: center;
          width: 100%;
          display: inline;
          padding: 5px 10px;
          font-size: 16px;
          background: #C4C4C4;
          color: #000;
          border-radius: 20px;
        }
      }
    }
    ${media.medium} {
      position:fixed;
      background: transparent;
      position: absolute;

      padding-left: 20px;
      height: 70px;
      z-index: 6;
      .logo-container {
        max-width:75vw;
        img {
          max-width:100%;
        }
      }

      .menu {
        overflow: hidden;
        height: auto;
        max-height: ${ menuOpened ? '100%' : '0' };
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        background: #000;
        bottom: 0;
        z-index: 10;
        display: flex;
        transition: all 0.5s;
        ul {
          flex-direction: column; 
          width: 50%;
          margin: auto;
          li {
            padding:20px 50px;
            background: transparent;
            border-radius: 0;
            color: #fff;
            border-bottom: 2px solid #34C55D;
            a {
              background: transparent;
            }
            &:last-child {
              border: 0;
            }
          }
        }
      }
    }
    }
  `;
  const StylesMenuMobile = css`

  display: none;
  ${media.medium} {
    z-index: 12;
    display: block;
    position: fixed;
    right: 20px;
    top: 20px;
    button {
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      color:#fff;
      border:none;

      &.open {
        .container {
          display: inline-block;
          cursor: pointer;
        }

        .bar1, .bar2, .bar3 {
          width: 35px;
          height: 5px;
          background-color: #fff;
          margin: 6px 0;
          transition: 0.4s;
        }

        &.change .bar1 {
          -webkit-transform: rotate(-45deg) translate(-8px, 6px);
          transform: rotate(-45deg) translate(-8px, 6px);
        }

        &.change .bar2 {opacity: 0;}

        &.change .bar3 {
          -webkit-transform: rotate(45deg) translate(-8px, -8px);
          transform: rotate(45deg) translate(-8px, -8px);
        }
      }
    } 
  }
`;



  return (
    <header css={[headerStyle(isLight)]}>
      <div className="container">
        <div className="logo-container">
          <Link to="/" replace={pathname === '/'}>
            <img src={senseiLogo} />
          </Link>
        </div>
        <div css={[StylesMenuMobile]}>
          <button onClick={handleToggleMenu} 
          className={`open ${menuOpened ? 'change' : ''}`}>
            <div className="container">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>

          </button>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <Link onClick={() => setMenuOpened(false)} to={`/${locale}/#about-us`} dangerouslySetInnerHTML={i18n(locale, 'about-us')} />
            </li>
            <li>
              <Link onClick={() => setMenuOpened(false)} to={`/${locale}/#services`} dangerouslySetInnerHTML={i18n(locale, 'services')} />
            </li>
            <li>
              <Link onClick={() => setMenuOpened(false)} to={`/${locale}/#team`} dangerouslySetInnerHTML={i18n(locale, 'team')} />
            </li>
            <li>
              <Link  onClick={() => setMenuOpened(false)} to={`/${locale}/#news`} dangerouslySetInnerHTML={i18n(locale, 'news')} />
            </li>
            { locale != 'es' && <li>
              <Link onClick={() => setMenuOpened(false)} to="/es">
                ES
              </Link>
              </li> }
            { locale != 'pt' && <li>
              <Link  onClick={() => setMenuOpened(false)} to="/pt">
                PT
              </Link>
              </li> }
            { locale != 'us' && <li>
              <Link  onClick={() => setMenuOpened(false)} to="/">
                EN
              </Link>
            </li> }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

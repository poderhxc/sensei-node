import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';

const StyledSection = ({ children, color, styles={}, classNames=""}) => {
  const themes = [];

  themes['gray'] = {
    main: '#E8E8E8',
    text: '#000',
  };

  themes['yellow'] = {
    main: '#FFC515',
    text: '#000',
  };

  themes['black'] = {
    main: '#000',
    text: '#FFC515',
  };
  
  themes['white'] = {
    main: '#fff',
    text: '#FFC515',
  };

  themes['green'] = {
    main: '#34C55D',
    text: '#000',
  };

  const Style = css`
    background: ${themes[color].main};
    position:relative;
    padding: 100px 0 150px;
    
    h2 {
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
      color: ${themes[color].text};
      width: 100%;
      padding-bottom: 80px;
    }

    h3 {
      font-size: 2rem;
      font-weight: 600;
      color: ${themes[color].text};
      width: 100%;
      padding: 20px 0;
    }

    ${media.medium} {
      h2 {
        font-size: 1.6em;
        text-align: center;
      }
      &.hidden-mobile {
        display: none;
      }
      &.nopadding-bot-mobile {
        padding-bottom: 0;
      }
      &.nopadding-bot-top-mobile {
        padding-top:0;
        padding-bottom:0;
      }

      h3 {
        font-size: 1.4rem;
      }
    }

    ${{...styles}}
  `;

  return (
    <section className={classNames} css={[Style]}>
      {children}
    </section>
  );
}

export default StyledSection;

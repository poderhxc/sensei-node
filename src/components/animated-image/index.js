import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';


const AnimatedImage = ({ imageUrl, direction, color, animated=true }) => {
  const transform = animated ? (direction === "left" ? 'perspective(1200px) rotate3d(0,1,0,25deg);' : 'perspective(1200px) rotate3d(0,1,0,-25deg);') : 'none';

  const Styles = css`
    position:relative;
    width: 60%;
    transform: ${transform}
    transition: all  0.5s;
    &:hover {
      transform: none;
    }

    img {
      position:relative;
      z-index: 2;
      width: 100%;
      height: 100%;
    }

    .prspct-img {
      background-image: url(${imageUrl});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      position:relative;
      z-index: 2;
      width: 100%;
      height: 100%;
    }

    &::before {
      z-index: 1;
      width: 100%;
      height: 100%;
      position:absolute;
      content: '';
      background: ${color === 'black' ? '#000' : '#FFC515'};
      transform: rotate(4deg);
    }

    ${media.medium} {
      width: 85%;
      margin: auto;
      height: 200px;
      transform: none;
    }

  `; 
  return (
    <div css={[Styles]}>
      <div className="prspct-img"></div>
    </div>
  );
}

export default AnimatedImage;

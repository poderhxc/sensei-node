import React from 'react';
import { css } from '@emotion/react';
import AnimatedImage from '../animated-image';
import StyledText from '../styled-text';
import media from '../../styles/media';

const ImageWithText = ({ align, color="#fff", animated=true, image='https://www.filepicker.io/api/file/zLrHcY60TCuQVWXWJ4tM' }) => {
  const Styles = css`
    display: flex;
    align-items: stretch;
    width: 100%;
    font-size: 1rem;
    color: ${color};
    ${media.medium} {
      flex-direction: column;
    }
`;
  const components = align == "left" 
    ? [<AnimatedImage animated={animated} direction="left" imageUrl={image} />, <StyledText />]
    : [<StyledText />, <AnimatedImage animated={animated} color="black" imageUrl={image} direction="right" imageUrl='https://www.filepicker.io/api/file/zLrHcY60TCuQVWXWJ4tM' />];

  return (
    <div 
      css={[Styles]}>
      {components}
    </div>
  );
}

export default ImageWithText;

import React from 'react';
import { css } from '@emotion/react';

import Hero from '../components/hero';
import ImageWithText from '../components/image-text';
import StyledSection from '../components/styled-section';


const AboutUsPage = () => {
  return (
    <>
      <Hero title={"Services"} />

      <StyledSection color={"white"} >
        <div class="container column">
          <h2>About Wanted <br/>
            Crew International</h2>

          <ImageWithText color="#000" align="left" />
        </div>
      </StyledSection>
    </>
  );
};

export default AboutUsPage;

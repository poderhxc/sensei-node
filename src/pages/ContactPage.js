import React from 'react';
import { css } from '@emotion/react';

import Hero from '../components/hero';
import ImageWithText from '../components/image-text';
import StyledSection from '../components/styled-section';
import Form from '../components/form';

const contactStyles = {
  "padding-top": "40px;",
  "h2": {
    "padding-bottom": "40px;"
  }
};
const ContactPage = () => {
  return (
    <>
      <Hero title={"Contact"} />

      <StyledSection styles={contactStyles} color={"black"} >
        <div class="container column">
          <h2>Contact</h2>

          <Form />
        </div>
      </StyledSection>
    </>
  );
};

export default ContactPage;

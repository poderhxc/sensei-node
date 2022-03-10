import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';

const Styles = css`
  width: 40%;
  padding: 30px;
  font-size: 1.1rem;
  line-height: 1.5;

  ul {
    padding: 10px;
    list-style: inside;
  }

  ${media.medium} {
    width: 100%;
    order: 2;
  }
`;

const StyledText = () => {
  return (
    <div css={[Styles]}>
      <h3>Welcome to Wanted Crew</h3>

      <p>
        When you need assistance for your event, you need that experience to be as hassle free as possible.
        <ul>
          <li>You want the crew to be punctual</li>
          <li>Its helpful if the crew dresses in a professional manner.</li>
          <li>You want to be working with people who are positive, energetic and who know which end of the cable goes into the socket ;)</li>
          <li>The crew defenitly needs to respect your equipment and your clients.</li>
          <li>You need the booking process to be as simple and pain free as possible.</li>
        </ul>
        Wanted Crew International was born with all that in mind.
      </p>
    </div>
  );
}

export default StyledText;


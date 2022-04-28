import React from 'react';
import { css } from '@emotion/react';
import media from '../../styles/media';
import Input from '../input';

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
    padding: 0 30px 50px;
  }
`;


const StylesForm = css`
  position:relative;
  width: 60%;
  transition: all  0.5s;
  margin: auto 60px;

  &:hover {
    transform: none;
  }



  &::before {
    z-index: 1;
    width: 105%;
    height: 110%;
    left: -2.5%;
    top: -5%;
    position:absolute;
    content: '';
    background: #FFC515;
    transform: rotate(4deg);
  }

  ${media.medium} {
    order: 3;
    width: 85%;
    margin: auto;
    height: 400px;
    transform: none;

    svg {
      display: none;
    }
  }
`; 

  const StylesContainer = css`
    display: flex;
    align-items: stretch;
    width: 100%;
    font-size: 1rem;
    color: #fff;
    ${media.medium} {
      flex-direction: column;
    }
`;

const StylesFormContainer = css`
      background: #fff;
      position:relative;
      z-index: 2;
      padding: 20px;

      width: 100%;
      height: 100%;
`;

const ButtonStyles = css`
     background: #FFC515; 
     color: #FFF;
     font-size: 16px;
     font-weight: bold;
     padding: 10px 40px;
     border-radius: 3px;
     border: 1px solid #FFC515;
     box-shadow: -3px 3px 0 #000;
     position:absolute;
     right: 30px;
     bottom: 30px;
     cursor: pointer;
     ${media.medium} {
      bottom: 20px;
     }

`;

const Form = () => {
  return (
    <div 
      css={[StylesContainer]}>
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


      <div css={[StylesForm]}>

        <form
          css={[StylesFormContainer]}>
            <Input
              name="mail"
              label="Mail" />
            <Input
              name="name"
              label="Name" />
            <Input
              name="phone"
              label="Phone" />
            <Input
              name="cv"
              label="CV"
              width="20%" />
            <Input
              name="letter"
              label="Cover Letter"
              width="20%" />

            <button onClick={(e)=> {
              e.preventDefault();
            }} css={[ButtonStyles]}> Send </button>
        </form>

      </div>

    </div>
  );
}

export default Form;


import React from 'react';
import { css } from '@emotion/react';

import media from '../../styles/media';

const Input = ({ width="80%", label, name }) => {
  const Styles = css`
    display:flex;
    margin: 10px 0;
    color:#000;
    ${media.medium} {
      flex-direction: column;
    }
  `;
  const StylesLabel = css`
    width:20%;
    color: #FFC515;
    font-weight: bold;
    display: flex;
    align-items: center;
    ${media.medium} {
      padding:5px 0;
      width: 100%;
    }
  `;

  const StylesInput = css`
      width:${width};
      input {
        width: 100%;
        border-radius: 15px;
        border: 1px solid #a0a0a0;
        height: 27px;
        padding: 5px 20px;
      }

    ${media.medium} {
      width:100%
    }
  `;
  return (
    <div css={[Styles]} > 
      <div css={[StylesLabel]}>
        <label>{label}</label>
      </div>
      <div css={[StylesInput]}>
        <input 
          name={name}/>
      </div>
    </div>

  );
};

export default Input;

import { css } from '@emotion/react';

const styles = css`
.loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #000;
  z-index: 10;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes loader {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
}

.loader-logo {
  width:429px;
  height:607px;
  background-repeat: no-repeat;
  background-size: contain;
  animation: loader 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.st0 {
  fill: #3F3FF8;
  z-index: 12;
}
`;

const Fallback = () => {
  return (
   <>
    <div css={styles}>
      <div className='loader'>
        <div className="loader-logo">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 595.28 841.89" xmlSpace="preserve">
        <g>
          <path className="st0" d="M297.25,562.19c-1.46-0.58-2.53-1.67-3.52-2.82c-6.29-7.29-12.58-14.57-18.83-21.89
            c-10-11.7-19.97-23.43-29.97-35.14c-9.72-11.39-19.47-22.76-29.2-34.14c-1.43-1.67-2.84-3.37-4.27-5.04
            c-0.55-0.65-0.8-1.37-0.79-2.23c0.09-5.54,0.15-11.09,0.23-16.63c0.11-7.81,0.24-15.62,0.36-23.43c0.02-1.26,0.59-2.11,1.65-2.5
            c1.06-0.39,2.06-0.11,2.87,0.83c5.23,6.06,10.47,12.11,15.69,18.18c8.09,9.41,16.2,18.81,24.25,28.26
            c10.76,12.63,21.47,25.31,32.2,37.97c3.19,3.76,6.36,7.53,9.54,11.29c0.59,0.69,1.22,1.34,1.96,1.88c1.07,0.79,2.19,0.88,3.37,0.26
            c0.75-0.4,1.42-0.9,2.06-1.45c11.74-10.06,23.47-20.13,35.21-30.19c3.69-3.17,7.36-6.35,11.04-9.53c0.12-0.11,0.25-0.21,0.36-0.32
            c1.84-1.81,2-2.97,0.38-4.98c-3.12-3.86-6.32-7.65-9.5-11.45c-11.26-13.49-22.52-26.97-33.78-40.46
            c-12.05-14.43-24.09-28.86-36.13-43.3c-0.52-0.62-1.01-1.27-1.44-1.95c-0.93-1.47-0.85-2.58,0.26-3.91c1.6-1.9,3.62-3.33,5.48-4.94
            c4.2-3.66,8.45-7.28,12.63-10.96c3.15-2.77,4.87-2.71,7.56,0.46c15.07,17.74,29.91,35.66,44.81,53.54
            c13.61,16.34,27.23,32.66,40.87,48.98c4.57,5.47,9.2,10.89,13.81,16.34c0.1,0.12,0.2,0.25,0.3,0.38c1.94,2.56,1.78,4.51-0.66,6.6
            c-4.28,3.68-8.59,7.31-12.89,10.96c-12.77,10.85-25.54,21.7-38.3,32.56c-14.36,12.23-28.71,24.47-43.06,36.71
            c-1.02,0.87-2.11,1.6-3.37,2.07C298.03,562.19,297.64,562.19,297.25,562.19z"/>
          <path className="st0" d="M197.25,365.05c0.53-1.3,1.5-2.26,2.54-3.14c12.99-11.04,25.98-22.07,38.98-33.11
            c11.34-9.63,22.68-19.26,34.02-28.88c7.49-6.35,14.99-12.69,22.48-19.04c0.22-0.19,0.46-0.36,0.7-0.52
            c1.38-0.93,2.17-0.89,3.37,0.24c1.51,1.43,2.8,3.06,4.15,4.63c12.38,14.36,24.63,28.83,36.88,43.3
            c12.76,15.06,25.52,30.12,38.29,45.17c1.19,1.41,2.42,2.8,3.66,4.16c0.74,0.82,1.02,1.72,0.98,2.83c-0.1,2.46-0.07,4.93-0.1,7.39
            c-0.06,5.28-0.13,10.57-0.2,15.85c-0.06,4.5-0.13,9.01-0.19,13.51c-0.02,1.04-0.04,2.07-0.08,3.11c-0.05,1.22-0.61,2.02-1.65,2.39
            c-1.05,0.37-2.08,0.08-2.88-0.85c-5.96-6.93-12.03-13.77-17.86-20.81c-16.51-19.95-33.47-39.51-50.15-59.32
            c-4.38-5.21-8.83-10.36-13.25-15.53c-0.06-0.07-0.12-0.15-0.19-0.22c-2.09-2.16-3.46-2.33-5.83-0.5
            c-3.85,2.97-7.44,6.25-11.14,9.41c-11.2,9.59-22.39,19.2-33.58,28.8c-0.98,0.84-2.01,1.65-2.81,2.68
            c-1.24,1.58-1.33,2.72-0.32,4.47c0.95,1.64,2.28,2.99,3.49,4.41c12.84,15.03,25.7,30.05,38.55,45.08
            c12.17,14.24,24.35,28.48,36.51,42.72c0.52,0.61,1.02,1.27,1.42,1.97c0.93,1.63,0.78,2.88-0.55,4.22
            c-1.04,1.06-2.16,2.05-3.28,3.04c-4.84,4.26-9.69,8.51-14.54,12.76c-0.19,0.17-0.4,0.33-0.6,0.49c-2.33,1.77-4.38,1.56-6.3-0.67
            c-3.46-4.03-6.91-8.08-10.37-12.12c-10.64-12.44-21.3-24.86-31.9-37.33c-11.74-13.8-23.44-27.63-35.15-41.46
            c-6.96-8.21-13.9-16.43-20.86-24.64c-0.88-1.04-1.65-2.14-2.26-3.36C197.25,365.83,197.25,365.44,197.25,365.05z"/>
        </g>
        </svg>
        </div>
      </div>
    </div>
   </>
  )
}

export default Fallback
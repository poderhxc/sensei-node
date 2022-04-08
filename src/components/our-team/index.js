import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import i18n from '../../i18n';

import jesus from '../../../public/team/jesus-chitty.jpeg';
import martin from '../../../public/team/martin-fernandez.jpeg';
import nacho from '../../../public/team/nacho-roizman.jpeg';
import pablo from '../../../public/team/pablo-larguia.jpeg';
import rodrigo from '../../../public/team/rodrigo-benzaquen.jpeg';

import { css } from '@emotion/react';
import media from '../../styles/media';

const Styles = css`
  z-index: 1;
  position: relative;
  .container {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &:after{
      content: '';
      width:100%;
      position:absolute;
      height:800px;
      z-index: 1;
      background:#F6F6F6;
      border-radius:35px;
      bottom: -280px;
    }
  }
  p {
    margin-top: 20px;
  }
  .join-button {
    background: #34C55D;
    border-radius: 35px;
    padding:15px 40px;
    font-size: 1.6rem;
    color: #fff;
    margin-bottom: 40px;
    z-index: 100;
    margin: 50px 0px 0px 0px;
  } 
  .tag {
    background: #fff;
    color: #000;
    border-radius: 60px;
    padding: 5px 20px;
    font-size: 2rem;
    border: 1px solid #000;
    margin-bottom: 60px;
  }
  .subtitle {
    min-height: 18px;
  }
  
  .members-container {
    z-index:3;
    padding-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90%;
    :after {
      content: '';
      width: 30%;
    }
    .member-container {
      width: 28%;
      position:relative;
      h3 {
        font-size: 2rem;
        font-weight: 100;
        text-transform: uppercase;
        color: #000;
        border-top:2px solid #000;
      }
      span {
        font-size: 1.5rem;
        color: #34C55D;
        width: 100%;
        display: block;
      }
      img {
        width:100%;
        margin-top: 30px;
        border-radius: 0 0 30px 30px;
      }
      ul {
        padding:50px 10px 100px;
      }
      li {
        font-size: 1.5rem;
        line-height: 2rem;
        list-style: initial ;
        margin-left: 15px;
      }
    }
  }
  .linkedin-link {
    width: 55px;
    height:55px;
    position:absolute;
    right: 10px;
    top: 75px;
    svg {
      width: 35px;
      margin-top: 40px;
      margin-left: 15px;
    }
  }
  ${media.medium} {
    .members-container {
      .member-container {
        width: 100%;
        transition: all 1s;
        max-height: 85px;
        overflow: hidden;
        margin-top: 30px;
        &.open {
          max-height: 2000px;
        }
      }
    }
    .container {
      &:after{
        content: none;
      }
    }
  }
`;

const teamMembers = [
  {
    name: "Pablo Larguia",
    title: "team-title-1",
    subtitle: "team-subtitle-1",
    picture: pablo,
    linkedin: "https://www.linkedin.com/in/pablolarguia/",
    description: [
      "team-1-desc-1",
      "team-1-desc-2",
      "team-1-desc-3",
      "team-1-desc-4",
    ]
  },
  {
    name: "Rodrigo Benzaquen",
    title: "team-title-2",
    subtitle: "team-subtitle-2",
    picture: rodrigo,
    linkedin: "https://www.linkedin.com/in/rbenzaquen/",
    description: [
      "team-2-desc-1",
      "team-2-desc-2",
      "team-2-desc-3",
    ]
  },
  {
    name: "Martin Fernandez",
    title: "team-title-3",
    subtitle: "team-subtitle-3",
    picture: martin,
    linkedin: "https://www.linkedin.com/in/martinfernandez666/",
    description: [
      "team-3-desc-1",
      "team-3-desc-2",
      "team-3-desc-3",
      "team-3-desc-4",
      "team-3-desc-5",
    ]
  },
  {
    name: "Nacho Roizman",
    title: "team-title-4",
    subtitle: "team-subtitle-4",
    picture: nacho,
    linkedin: "https://www.linkedin.com/in/iroizman/",
    description: [
      "team-4-desc-1",
      "team-4-desc-2",
      "team-4-desc-3",
      "team-4-desc-4",
    ]
  },
  {
    name: "Jesus Chitty",
    title: "team-title-5",
    subtitle: "team-subtitle-5",
    picture: jesus,
    linkedin: "https://www.linkedin.com/in/jesuschitty/",
    description: [
      "team-5-desc-1",
      "team-5-desc-2",
      "team-5-desc-3",
    ]
  }
];

const MemberBox = ({name, title, subtitle, picture, linkedin, description}) => {
  let { locale } = useParams();
  locale = locale || 'us';

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (e) => { setIsOpen(!isOpen); }
  return(
  <div onClick={handleOpen} className={`member-container ${isOpen ? 'open' : ''}`}>
    <h3>{name}</h3>
    <span className="title" dangerouslySetInnerHTML={i18n(locale, title)} />
    <span className="subtitle" dangerouslySetInnerHTML={i18n(locale, subtitle)} />
    <a className="linkedin-link" href={linkedin} target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
    </a>
    <img src={picture} />
    <ul>
      { description && description.map((e, index) => <li key={index} dangerouslySetInnerHTML={i18n(locale, e)} />) }
    </ul>
  </div>
  );
}

const OurTeam = () => {
  let { locale } = useParams();
  locale = locale || 'us';

  return (
    <div id="team" css={[Styles]}>
      <div className="container">
        <span className="tag" dangerouslySetInnerHTML={i18n(locale, 'our-team-title')} />
        <div className="members-container">
          { teamMembers.map((member, index) => <MemberBox key={index} {...member} />) }
        </div>
        <a className="join-button" target="_blank" href="https://mailchi.mp/a51956a0bcd9/senseinode-careers"  dangerouslySetInnerHTML={i18n(locale, 'join-us')} />
      </div>
    </div>
  );
}

export default OurTeam;


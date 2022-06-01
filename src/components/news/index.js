import React from 'react';
import { useState, createRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import i18n from '../../i18n';
import media from '../../styles/media';
import NewsIcon from '../icons/news';
import axios from 'axios';
const { DateTime } = require("luxon");
import dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
import config from '../../../functions/utils/config';

const News = ({history}) => {
  let { locale } = useParams();
  locale = locale || 'us';
  const [ news, setNews ]  = useState(false);
  const [ isDragging, setIsDragging ] = useState(false);
  const [ isMoving, setIsMoving ] = useState(false);
  const [ isFetching, setIsFetching ] = useState(false);

  const [ position, setPosition ] = useState({
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  });

  const Styles = css`
    z-index: 1;
    position: relative;
    width: 100vw;
    overflow: hidden;

    .container {
      flex-direction: column;
      align-items: flex-start;
    }
    p {
      margin-top: 20px;
    }
    h2 {
      color: #fff;
      font-weight: 300;
      text-align: left;
      padding-bottom: 40px;
    }
    .tag {
      background: #000;
      color: #fff;
      border-radius: 60px;
      padding: 5px 20px;
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 60px;
    }
    .slider-container {
      width: 100vw;
      overflow:scroll;
      padding-left: calc((100vw - 1200px) / 2 );
      /* Hide scrollbar for Chrome, Safari and Opera */
      ::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      cursor: ${ isDragging ? 'grab' : 'pointer' };
    }

    .news-container {
      max-width: 1000vw;
      width: auto;
      z-index:3;
      padding-top: 40px;
      float: left;
      display: flex;
      .new-container {
        width: 400px;
        position:relative;
        background: #14302B;
        border-radius: 15px;
        margin-right: 20px;
        padding:25px;

        .date {
          color: #B0EFA8;
        }

        p {
          color:white;
          font-size: 1.3rem;
          line-height: 2rem;
          font-weight:100;
          margin-bottom: 160px;
        }

        h3 {
          font-size: 1.6rem;
          font-weight: 300;
          padding-top:0;
          color: #fff;
        }
        .link-icon .icon-container  {
          display: flex;
          flex-direction: row;
          position: absolute;
          bottom: 20px;
          left: 20px;
          justify-content:center;
          align-items: center;
          svg {
            width: 30px;
            height: 30px;
          }
          span {
            color: #C8C8C8;
            font-weight: 100;
            margin-left: 10px;
          }
        }
        span {
          font-size: 1.5rem;
          font-weight: 100;
          color: #34C55D;
          width: 100%;
          display: block;
        }
      }
    }

    ${media.medium} {
      .container {padding:20px;}
      .slider-container {
        padding-left: 20px;
        .new-container {
          max-width: 80vw;
        }
      }
      h2 { font-size: 3rem; line-height: 3.5rem; padding-right: 20px;}
    }
  `;
  
  const myRef = createRef();

  const handleMouseMove = (e) => {
    e.preventDefault()
    if (isDragging) {
      setIsMoving(true);
      const dx = e.clientX - position.x;
      const dy = e.clientY - position.y;

      // Scroll the element
      myRef.current.scrollTop = position.top - dy;
      myRef.current.scrollLeft = position.left - dx;
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    if (!isDragging) {
      setIsMoving(false);
      setPosition({
        left: myRef.current.scrollLeft,
        top: myRef.current.scrollTop,
        x: e.clientX,
        y: e.clientY,
      })
      setIsDragging(true);
    }
  }

  const handleMouseUp = (e) => {
    e.preventDefault()
    setIsMoving(false);
    setIsDragging(false);
  }


  const NewBox = React.memo(({title, date, description, picture, link, source, id, visible}) => {
    let { locale } = useParams();
    locale = locale || 'us';
    const handleClickLink = (e) => {
      e.preventDefault()
      if (!isMoving) { 
        window.location.href = link;
      }
    }
    //const [bgImage, setBgImage] = useState(picture);
    const image = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${id}.png?alt=media`;
  const StylesImg = css`
        margin-top: 30px;
        border-radius: 30px;
        float:right;
        margin-bottom:40px;
        width: 125px;
        height: 125px;
        position:absolute;
        bottom:20px;
        right:30px;
        background-size:cover;
        background-repeat:no-repeat;
        background-position:center;
        background-image: url(${image});`;

      return visible != "0" && 
        <a className="new-container" onMouseUp={handleClickLink} target="_blank" href={link}>
          <h3>{title}</h3>
          <span className="date">{date}</span>
          <p className="title"> {description} </p>
          <div css={[StylesImg]}></div>
          <div className="link-icon">
            <div className="icon-container">
              <NewsIcon />
              <span >{source}</span>
            </div>
          </div>
        </a> 
  });

  useEffect(() => {
    if (!news && !isFetching) {
      setIsFetching(true);
      let lang;
      if(!locale || locale == 'us'){
        lang = 'en';
      } else {
        lang = locale
      }
    	axios
			.get(`https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/news/${lang}`)
			.then((response) => {
        let fetchedNews = response.data
        fetchedNews.sort((a,b) => {
          dayjs.extend(customParseFormat)
          dayjs.extend(isSameOrBefore)

          const dateA = dayjs(a.date, 'DD.MM.YY');
          const dateB = dayjs(b.date, 'DD.MM.YY');

          if (dateA.isBefore(dateB)) {
            return 1;
          }

          if (dateB.isBefore(dateA)) {
            return -1;
          }

          return 0
        });
				setNews(fetchedNews);
			})
			.catch((err) => {
				console.log(err);
			});
    }
  }, []);

  return (
    <div id="news" css={[Styles]}>
      <div className="container">
        <span className="tag" dangerouslySetInnerHTML={i18n(locale, 'news-subtitle')} />
        <h2 dangerouslySetInnerHTML={i18n(locale, 'news-title')} />
      </div>

      <div className="slider-container"
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onMouseMove={handleMouseMove}
        ref={myRef}>
        <div className="news-container">
          {news && news.map((newdata, index) => <NewBox key={index} {...newdata} />) }
        </div>
      </div>
    </div>
  );
}

export default withRouter(News);


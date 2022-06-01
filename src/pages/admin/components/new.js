import React, { useEffect, useState, useCallback } from 'react'
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { useParams } from 'react-router-dom';
import config from '../../../../functions/utils/config';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';
const { DateTime } = require("luxon");
var customParseFormat = require('dayjs/plugin/customParseFormat')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import Loader from './loader.js'
import Modal from './modal.js'

const styles = ((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    submitButton: {
      display: 'block',
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      top: 14,
      right: 10
    },
    floatingButton: {
      position: 'fixed',
      bottom: 0,
      right: 0
    },
    form: {
      width: '98%',
      paddingLeft: 13,
      paddingTop: theme.spacing(3),
    },
    root: {
      minWidth: 470,
      display: 'flex',
      padding: 15,
      alignItems: 'center',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    pos: {
      marginBottom: 12
    },
    uiProgess: {
      position: 'fixed',
      zIndex: '1000',
      height: '31px',
      width: '31px',
      left: '50%',
      top: '35%'
    },
    dialogeStyle: {
      maxWidth: '50%'
    },
    viewRoot: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    },
    image: {
      maxWidth: 150,
      maxHeight: 150,
      height: 'auto',
      width: 'auto',
    },
    imageContainer: {
      width: 150,
    }
}));

const NewComponent = (props) => {
    const [news, setNews] = useState([]);
    const [openNew, setOpenNew] = useState({});
    const [errors, setErrors] = useState([]);
    const [uiLoading, setUiLoading] = useState(true);
    const [buttonType, setButtonType] = useState('');
    const [open, setOpen] = useState(false);
    const [fetchedLang, setFetchedLang] = useState(false);
    const [isFetching, setIsFetching]  = useState(true);
		const { classes, history } = props;
    const { lang } = useParams();
  
    const handleClose = (event) => {
      setOpen(false);
    };
    
    const handleChange = (event) => {
      setOpenNew({
        ...openNew,
        [event.target.name]: event.target.value
      });
    };

    const handleSubmit = (event) => {
      authMiddleWare(history);
      event.preventDefault();
      const userNew = { ...openNew };
  
      let options = {};
      if (buttonType === 'Edit') {
        options = {
          url: `https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/news/${openNew.id}`,
          method: 'put',
          data: userNew
        };
      } else {  
        options = {
          url: 'https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/news',
          method: 'post',
          data: userNew
        };
      }
  
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios(options)
        .then(() => {
          setOpen(false);
          window.location.reload();
        })
        .catch((error) => {
          setOpen(true);
          setErrors(error.response.data);
          console.log(error);
        });
    };
    
    const deleteNewHandler = (data) => {
      authMiddleWare(history);
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      let newId = data.newRow.id;
      axios
        .delete(`https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/news/${newId}`)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const handleClickOpen = () => {
      setOpen(true);
      setButtonType('');
			setOpenNew({
				title: '',
				description: '',
        link: '',
        source: '',
        date: '',
        picture: '',
        lang: '',
				buttonType: '',
        visible: '',
				open: true
			});
		};

    const handleEditClickOpen = (data) => {
      setOpen(true);
      setButtonType('Edit');
      setOpenNew({
        title: data.newRow.title,
        description: data.newRow.description,
        source: data.newRow.source,
        link: data.newRow.link,
        picture: data.newRow.picture,
        date: data.newRow.date,
        visible: data.newRow.visible,
        lang: data.newRow.language,
        id: data.newRow.id
      });
    }

    const fetchData = useCallback(() => {
        if (((!isFetching && news.length === 0) 
        || fetchedLang != lang)) {
        setIsFetching(true);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        let url = `https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/news/`;
        
        if (lang !== undefined){
          url = `https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/news/${lang}`;
        }

        axios
          .get(url)
          .then((response) => {
            setUiLoading(false);
            setIsFetching(false);
            setFetchedLang(lang);
            let news = [...response.data];

            news.sort((a,b) => {
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
            setNews(news);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [lang]);

    useEffect( () => {
      authMiddleWare(history);
      dayjs.extend(relativeTime);
      fetchData();
    }, [lang]);

    return uiLoading === true ? (
      <Loader classes={classes} />
    ) : (
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <IconButton
          className={classes.floatingButton}
          color="primary"
          aria-label="Add New"
          onClick={handleClickOpen}
        >
          <AddCircleIcon style={{ fontSize: 60 }} />
        </IconButton>

        <Modal
          open={open}
          buttonType={buttonType}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          openNew={openNew}
        />

        <Grid container spacing={1}>
          {news.map((newRow) => {
            return (
              newRow.title && newRow.description &&
              <Grid key={newRow.id} item xs={12} sm={12}>
                <Card className={classes.root} variant="outlined">
                    <div className={classes.imageContainer} >
                      <img className={classes.image} src={`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${newRow.id}.png?alt=media`} />
                    </div>
                    <div>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {newRow.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {newRow.date}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {newRow.description}
                        </Typography>
                      </CardContent>

                      <CardActions>
                      <Button size="small" color="primary" onClick={() => handleEditClickOpen({ newRow })}>
                        Editar
                      </Button>
                      <Button size="small" color="primary" onClick={() => deleteNewHandler({ newRow })}>
                        Borrar
                      </Button>
                    </CardActions>
                  </div>

                </Card>
              </Grid>
            )
          })}
        </Grid>
      </main>
    );
};

export default withStyles(styles)(NewComponent);

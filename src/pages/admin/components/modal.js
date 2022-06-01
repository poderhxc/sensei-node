import React, { forwardRef, useState } from 'react';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';
import config from '../../../../functions/utils/config';
import { Block } from '@material-ui/icons';
const Transition = forwardRef((props, ref) => <Slide direction="up"  {...props} ref={ref} />);


const styles = ((theme) => ({
  form: {
    width: '98%',
    paddingLeft: 13,
    paddingTop: theme.spacing(3),
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%'
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
},
  previewContainer: {
    width: '100%',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: 15,
  },
  image: {
    maxWidth: '100%',
    maxHeight:'100%',
    margin: 'auto',
    display: 'block',
  },
  input: {
    marginBottom: 25,
  },
  button: {
    width:'100%',
    marginBottom: 15,
  },
  uploadInput: {
    width:'100%',
  },
  select: {
    marginBottom: 15,
  },
  saveButton: {
    background: '#3f50b5',
    padding: '5px 20px',
    color: '#FFF',
    marginTop: 15,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 15px',
    borderBottom: '1px solid #ccc'
  }
}));

const Modal = ({ 
  classes, 
  open, 
  handleClose, 
  handleSubmit, 
  handleChange, 
  buttonType,
  errors,
  openNew,
  history,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(openNew.image ? openNew.image : '');
  const [imageError, setImageError] = useState(false);

	const handleImageChange = event => setImage(event.target.files[0]);

  const pictureHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    authMiddleWare(history);
    const authToken = localStorage.getItem('AuthToken');
    let form_data = new FormData();
    form_data.append('new_id', openNew.id);
    form_data.append('image', image);
    axios.post('https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/news/image', form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `${authToken}`,
      }
    })
    .then(() => {
      setIsLoading(false);
    })
    .catch((error) => {
      if (error.response.status === 403) {
        history.push('https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/login');
      }
      console.log(error);
      setIsLoading(false);
      setImageError('Error in posting the data');
    });
  };

  if (isLoading) {
    return (
      <main className={classes.content}>
        <CircularProgress size={150} className={classes.uiProgess} />
      </main>
    );
  }
  return (
    
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className={classes.header}>
          <Typography variant="h6">
            {buttonType === 'Edit' ? 'Editar noticia' : 'Crear nueva noticia'}
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>


      <form className={classes.form} noValidate>
        <Grid container spacing={2}>

          <Grid item xs={6}>

            <TextField
             className={classes.input}
              variant="outlined"
              required
              fullWidth
              id="newTitle"
              label="TITULO"
              name="title"
              autoComplete="newTitle"
              helpertext={errors.title}
              value={openNew.title}
              error={errors.title ? true : false}
              onChange={handleChange}
            />

            <TextField
              className={classes.input}
              variant="outlined"
              required
              fullWidth
              id="newDate"
              label="FECHA"
              name="date"
              autoComplete="newDate"
              helpertext={errors.date}
              value={openNew.date}
              error={errors.date ? true : false}
              onChange={handleChange}
            />

            <TextField
              className={classes.input}
              variant="outlined"
              required
              fullWidth
              id="newLink"
              label="ENLACE"
              name="link"
              autoComplete="newLink"
              helpertext={errors.link}
              value={openNew.link}
              error={errors.link ? true : false}
              onChange={handleChange}
            />

            <TextField
              className={classes.select}
              variant="outlined"
              required
              fullWidth
              id="newSource"
              label="FUENTE"
              name="source"
              autoComplete="newSource"
              helpertext={errors.source}
              value={openNew.source}
              error={errors.source ? true : false}
              onChange={handleChange}
            />

            <InputLabel id="newLang-label">LENGUAJE</InputLabel>

            <Select
              className={classes.select}
              labelId="newLang-label"
              variant="outlined"
              required
              fullWidth
              id="newLang"
              name="lang"
              autoComplete="newLanguage"
              helpertext={errors.lang}
              value={openNew.lang}
              error={errors.lang ? true : false}
              onChange={handleChange}
            >
              <MenuItem selected={ openNew.lang === "en" ? true : false } value="en">EN</MenuItem>
              <MenuItem selected={ openNew.lang === "es" ? true : false } value="es">ES</MenuItem>
              <MenuItem selected={ openNew.lang === "pt" ? true : false } value="pt">PT</MenuItem>
              <MenuItem selected={ openNew.lang === "test" ? true : false } value="test">TEST</MenuItem>
            </Select>

            <InputLabel id="newVis-label">VISIBILIDAD</InputLabel>

            <Select
              className={classes.select}
              labelId="newVis-label"
              variant="outlined"
              required
              fullWidth
              id="newVis"
              name="visible"
              autoComplete="newLanguage"
              helpertext={errors.visible}
              value={openNew.visible ? openNew.visible : 0}
              error={errors.visible ? true : false}
              onChange={handleChange}
            >
              <MenuItem selected={ openNew.visible === "1" ? true : false } value="1">Visible</MenuItem>
              <MenuItem selected={ openNew.visible != "1" ? true : false } value="0">Oculta</MenuItem>
            </Select>


          </Grid>

          <Grid item xs={6}>
            {buttonType === 'Edit' ? (
              <div>
                <div>
                  <div className={classes.previewContainer}>
                    <img className={classes.image} src={`https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${openNew.id}.png?alt=media`} />
                  </div>
                  <span>Formato soportado: .png</span>
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      size="small"
                      startIcon={<CloudUploadIcon />}
                      className={`${classes.uploadButton} ${classes.button}`}
                      onClick={pictureHandler}
                    >
                      SUBIR FOTO
                    </Button>
                    <input className={classes.uploadInput} type="file" onChange={handleImageChange} />

                    {imageError ? (
                      <div className={classes.customError}>
                        {' '}
                        Wrong Image Format || Supported Format are PNG and JPG
                      </div>
                    ) : (
                      false
                    )}
                  </div>
                </div>
                <div className={classes.progress} />
              </div>
            )  : ''}
          </Grid>
          <Grid item xs={12}>

            <TextField
              variant="outlined"
              required
              fullWidth
              id="newDescription"
              label="DESCRIPCION"
              name="description"
              autoComplete="newDescription"
              multiline
              minRows={25}
              maxRows={25}
              helpertext={errors.description}
              error={errors.description ? true : false}
              onChange={handleChange}
              value={openNew.description}
            />
            <Button
              autoFocus
              color="inherit"
              onClick={handleSubmit}
              className={classes.saveButton}
            >
              GUARDAR
            </Button>
          </Grid>
        </Grid>

      </form>
    </Dialog>
  );
}


export default withStyles(styles)(Modal);

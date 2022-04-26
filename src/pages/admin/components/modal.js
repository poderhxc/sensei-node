import React, { forwardRef } from 'react';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { authMiddleWare } from '../util/auth';

const Transition = forwardRef((props, ref) => <Slide direction="up"  {...props} ref={ref} />);


const Modal = ({ 
  classes, 
  open, 
  handleClose, 
  handleSubmit, 
  handleChange, 
  buttonType,
  errors,
  openNew
}) => {

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {buttonType === 'Edit' ? 'Edit New' : 'Create a new New'}
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            {buttonType === 'Edit' ? 'Save' : 'Submit'}
          </Button>
        </Toolbar>
      </AppBar>

      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="newTitle"
              label="New Title"
              name="title"
              autoComplete="newTitle"
              helperText={errors.title}
              value={openNew.title}
              error={errors.title ? true : false}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="newDate"
              label="New Date"
              name="date"
              autoComplete="newDate"
              helperText={errors.date}
              value={openNew.date}
              error={errors.date ? true : false}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="newLink"
              label="New Link"
              name="link"
              autoComplete="newLink"
              helperText={errors.link}
              value={openNew.link}
              error={errors.link ? true : false}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="newPicture"
              label="New Picture"
              name="picture"
              autoComplete="newPicture"
              helperText={errors.picture}
              value={openNew.picture}
              error={errors.picture ? true : false}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="newSource"
              label="New Source"
              name="source"
              autoComplete="newSource"
              helperText={errors.source}
              value={openNew.source}
              error={errors.source ? true : false}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <InputLabel id="newLang-label">Language</InputLabel>

            <Select
              labelId="newLang-label"
              variant="outlined"
              required
              fullWidth
              id="newLang"
              name="lang"
              autoComplete="newLanguage"
              helperText={errors.lang}
              value={openNew.lang}
              error={errors.lang ? true : false}
              onChange={handleChange}
            >
              <MenuItem selected={ openNew.lang === "en" ? true : false } value="en">EN</MenuItem>
              <MenuItem selected={ openNew.lang === "es" ? true : false } value="es">ES</MenuItem>
              <MenuItem selected={ openNew.lang === "pt" ? true : false } value="pt">PT</MenuItem>
            </Select>
        </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="newDescription"
              label="New description"
              name="description"
              autoComplete="newDescription"
              multiline
              rows={25}
              rowsMax={25}
              helperText={errors.description}
              error={errors.description ? true : false}
              onChange={handleChange}
              value={openNew.description}
            />
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
}


export default Modal;
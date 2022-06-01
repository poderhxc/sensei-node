
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';

import Account from './components/account';
import News from './components/new';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';

import { authMiddleWare } from '../../util/auth';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 110,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		marginTop: 20
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
	},
	toolbar: theme.mixins.toolbar,
  navLink: {
    padding: '15px'
  },
  previewContainer: {
    maxWidth: '400px',
    maxHeight: '400px',
    border: '1px solid #333',
    borderRadius: '15px',
  },
  active: {
    color: 'black',
    background: 'white',
    borderRadius: '100%',
  }
});



const AdminPage = (props) => {
  const [render, setRender] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: '',
  });
  const [uiLoading, setUiLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { history, classes } = props;
  const [fetchedUserData, setFetchedUserData] = useState(false);
  const { lang } = useParams();

	const loadAccountPage = (event) => {
		setRender(true);
	};

	const loadNewsPage = (event) => {
		setRender(false);
	};

	const logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		history.push('/admin/login');
	};

  useEffect(() => {
    if (!fetchedUserData) {
      setFetchedUserData(true);
      authMiddleWare(props.history);
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios
        .get('https://us-central1-senseiweb-d1c41.cloudfunctions.net/api/user')
        .then((response) => {
          setUserData(response.data.userCredentials);
          setUiLoading(false);
        })
        .catch((error) => {
          setUiLoading(false);
  
          if(error.response.status === 403) {
            history.push('/admin/login')
          }
          console.log(error);
          setErrorMsg('Error in retrieving the data');
        });
    }
  })
  return uiLoading ? (
    <div className={classes.root}>
      <CircularProgress size={150} className={classes.uiProgess} />
    </div>
  ) : (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Grid item xs={10} sm={10}>
              <Typography variant="h6" noWrap>
                Sensei Node Admin
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <div className="language">
                <NavLink className={`${classes.navLink} ${lang === 'en' ? classes.active : ''}`} color="inherit" href="/#/admin/home/en/" >
                  EN
                </NavLink>
                <NavLink className={`${classes.navLink} ${lang === 'pt' ? classes.active : ''}`} color="inherit" href="/#/admin/home/pt/" >
                  PT
                </NavLink>
                <NavLink className={`${classes.navLink} ${lang === 'es' ? classes.active : ''}`} color="inherit" href="/#/admin/home/es/" >
                  ES
                </NavLink>
                <NavLink className={`${classes.navLink} ${lang === undefined ? classes.active : ''}`} color="inherit" href="/#/admin/home/" >
                  All
                </NavLink>
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <center>
            <Avatar src={userData.imageUrl} className={classes.avatar} />
            <p>
              {' '}
              {userData.firstName} {userData.lastName}
            </p>
          </center>
          <Divider />
          <List>
            <ListItem button key="Noticias" onClick={loadNewsPage}>
              <ListItemIcon>
                {' '}
                <NotesIcon />{' '}
              </ListItemIcon>
              <ListItemText primary="Noticias" />
            </ListItem>

            <ListItem button key="Cuenta" onClick={loadAccountPage}>
              <ListItemIcon>
                {' '}
                <AccountBoxIcon />{' '}
              </ListItemIcon>
              <ListItemText primary="Cuenta" />
            </ListItem>

            <ListItem button key="Salir" onClick={logoutHandler}>
              <ListItemIcon>
                {' '}
                <ExitToAppIcon />{' '}
              </ListItemIcon>
              <ListItemText primary="Salir" />
            </ListItem>
          </List>
        </Drawer>

        <div>{render ? <Account /> : <News />}</div>
      </div>
  );
}

export default withStyles(styles)(AdminPage);

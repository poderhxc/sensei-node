import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


const Loader = ({classes}) =>(
  <main className={classes.content}>
    <div className={classes.toolbar} />
    {<CircularProgress size={150} className={classes.uiProgess} />}
  </main>
);

export default  Loader;
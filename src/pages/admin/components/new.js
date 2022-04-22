import React, { Component } from 'react'
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { authMiddleWare } from '../util/auth';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

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
      marginLeft: 13,
      marginTop: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    root: {
      minWidth: 470
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
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

class NewComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			news: '',
			title: '',
			description: '',
      source: '',
      link: '',
      picture: '',
      date: '',
			id: '',
			errors: [],
			open: false,
			uiLoading: true,
			buttonType: '',
			viewOpen: false
		};
		this.deleteNewHandler = this.deleteNewHandler.bind(this);
		this.handleEditClickOpen = this.handleEditClickOpen.bind(this);
		this.handleViewOpen = this.handleViewOpen.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('http://localhost:5000/sensei-node/us-central1/api/news')
			.then((response) => {
				this.setState({
					news: response.data,
					uiLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	deleteNewHandler(data) {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		let newId = data.newRow.id;
		axios
			.delete(`http://localhost:5000/sensei-node/us-central1/api/news/${newId}`)
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleEditClickOpen(data) {
		this.setState({
			title: data.newRow.title,
			description: data.newRow.description,
      source: data.newRow.source,
      link: data.newRow.link,
      picture: data.newRow.picture,
      date: data.newRow.date,
      lang: data.newRow.lang,
			id: data.newRow.id,
			buttonType: 'Edit',
			open: true
		});
	}

	handleViewOpen(data) {    
		this.setState({
			title: data.newRow.title,
			description: data.newRow.description,
      source: data.newRow.source,
      link: data.newRow.link,
      picture: data.newRow.picture,
      date: data.newRow.date,
      lang: data.newRow.lang,
			viewOpen: true
		});
	}

	render() {
		const DialogTitle = withStyles(styles)((props) => {
			const { children, classes, onClose, ...other } = props;
			return (
				<MuiDialogTitle disableTypography className={classes.root} {...other}>
					<Typography variant="h6">{children}</Typography>
					{onClose ? (
						<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
							<CloseIcon />
						</IconButton>
					) : null}
				</MuiDialogTitle>
			);
		});

		const DialogContent = withStyles((theme) => ({
			viewRoot: {
				padding: theme.spacing(2)
			}
		}))(MuiDialogContent);

		dayjs.extend(relativeTime);
		const { classes } = this.props;
		const { open, errors, viewOpen } = this.state;

		const handleClickOpen = () => {
			this.setState({
				id: '',
				title: '',
				description: '',
				buttonType: '',
				open: true
			});
		};

		const handleSubmit = (event) => {
			authMiddleWare(this.props.history);
			event.preventDefault();

			const userNew = {
				title: this.state.title,
				description: this.state.description,
        date: this.state.date,
        link: this.state.link,
        picture: this.state.picture,
        source: this.state.source,
        lang: this.state.lang,
        id: this.state.id
			};

			let options = {};
			if (this.state.buttonType === 'Edit') {
				options = {
					url: `http://localhost:5000/sensei-node/us-central1/api/news/${this.state.id}`,
					method: 'put',
					data: userNew
				};
			} else {
        // userNew.id = firebase.database().ref().child('news').push().key;

				options = {
					url: 'http://localhost:5000/sensei-node/us-central1/api/news',
					method: 'post',
					data: userNew
				};
			}
			const authToken = localStorage.getItem('AuthToken');
			axios.defaults.headers.common = { Authorization: `${authToken}` };
			axios(options)
				.then(() => {
					this.setState({ open: false });
					window.location.reload();
				})
				.catch((error) => {
					this.setState({ open: true, errors: error.response.data });
					console.log(error);
				});
		};

		const handleViewClose = () => {
			this.setState({ viewOpen: false });
		};

		const handleClose = (event) => {
			this.setState({ open: false });
		};

		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
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
					<Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
						<AppBar className={classes.appBar}>
							<Toolbar>
								<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
									<CloseIcon />
								</IconButton>
								<Typography variant="h6" className={classes.title}>
									{this.state.buttonType === 'Edit' ? 'Edit New' : 'Create a new New'}
								</Typography>
								<Button
									autoFocus
									color="inherit"
									onClick={handleSubmit}
									className={classes.submitButton}
								>
									{this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
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
										value={this.state.title}
										error={errors.title ? true : false}
										onChange={this.handleChange}
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
										value={this.state.date}
										error={errors.date ? true : false}
										onChange={this.handleChange}
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
										value={this.state.link}
										error={errors.link ? true : false}
										onChange={this.handleChange}
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
										value={this.state.picture}
										error={errors.picture ? true : false}
										onChange={this.handleChange}
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
										value={this.state.source}
										error={errors.source ? true : false}
										onChange={this.handleChange}
									/>
								</Grid>

								<Grid item xs={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="newLang"
										label="New Language"
										name="language"
										autoComplete="newLanguage"
										helperText={errors.lang}
										value={this.state.lang}
										error={errors.lang ? true : false}
										onChange={this.handleChange}
									/>
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
										onChange={this.handleChange}
										value={this.state.description}
									/>
								</Grid>
							</Grid>
						</form>
					</Dialog>

					<Grid container spacing={2}>
						{this.state.news.map((newRow) => (
              newRow.title && newRow.description &&
							<Grid item xs={12} sm={12}>
								<Card className={classes.root} variant="outlined">
									<CardContent>
										<Typography variant="h5" component="h2">
											{newRow.title}
										</Typography>
										<Typography className={classes.pos} color="textSecondary">
											{dayjs(newRow.createdAt).fromNow()}
										</Typography>
										<Typography variant="body2" component="p">
											{`${newRow.description.substring(0, 65)}`}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary" onClick={() => this.handleViewOpen({ newRow })}>
											{' '}
											View{' '}
										</Button>
										<Button size="small" color="primary" onClick={() => this.handleEditClickOpen({ newRow })}>
											Edit
										</Button>
										<Button size="small" color="primary" onClick={() => this.deleteNewHandler({ newRow })}>
											Delete
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>

					<Dialog
						onClose={handleViewClose}
						aria-labelledby="customized-dialog-title"
						open={viewOpen}
						fullWidth
						classes={{ paperFullWidth: classes.dialogeStyle }}
					>
						<DialogTitle id="customized-dialog-title" onClose={handleViewClose}>
							{this.state.title}
						</DialogTitle>
						<DialogContent dividers>
							<TextField
								fullWidth
								id="newDetails"
								name="description"
								multiline
								readonly
								rows={1}
								rowsMax={25}
								value={this.state.description}
								InputProps={{
									disableUnderline: true
								}}
							/>
						</DialogContent>
					</Dialog>
				</main>
			);
		}
	}
}

export default withStyles(styles)(NewComponent);

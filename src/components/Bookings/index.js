import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link, withRouter} from 'react-router-dom'
import AppDrawer from "../Dashboard/AppDrawer";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

function Bookings(props) {
    const {classes} = props
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Please login first')
        props.history.replace('/login')
        return null
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppDrawer/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <h1>space 1</h1>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <h1>space 2</h1>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h1>space 3</h1>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <h1>space 4</h1>
                    </Box>
                </Container>
            </main>
        </div>
    );

}

export default withRouter(withStyles(styles)(Bookings))
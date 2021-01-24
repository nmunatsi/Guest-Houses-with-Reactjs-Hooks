import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles'
import {Link, withRouter} from 'react-router-dom'


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
        '& > *': {
            margin: theme.spacing(1),
        },
        paddingLeft: theme.spacing(35),
    },
    fixedHeight: {
        height: 240,
    }, appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
});

function Clients(props) {
    const {classes} = props
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h1>Clients</h1>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );

}

export default withRouter(withStyles(styles)(Clients))
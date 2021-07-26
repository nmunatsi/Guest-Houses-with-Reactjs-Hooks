import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import firebase from '../../Backend/firebase'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter} from 'react-router-dom'
import AppDrawer from "../AppDrawer";
import Button from '@material-ui/core/Button';
import Services from "./Settings/Services";
import MyAccount from "./Settings/MyAccount";
import CompanyUsers from "./Settings/CompanyUsers";
import Clients from "./Settings/Clients";
import RoomList from "./Settings/RoomList";


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
        marginBottom:10,
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

function MyHouse(props) {
    const {classes} = props
    const [frag, setFrag] = React.useState(1);


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
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Button variant="outlined" color="secondary" onClick={event => (setFrag(1))}>
                                    Rooms
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={event => (setFrag(2))}>
                                    Clients
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={event => (setFrag(3))}>
                                    Services
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={event => (setFrag(4))}>
                                    Company & Users
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={event => (setFrag(5))}>
                                    My Account
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>

                    <div>
                        {
                            frag === 1 && <RoomList/>
                        }
                        {
                            frag === 2 && <Services/>
                        }
                        {
                            frag === 3 && <MyAccount/>
                        }
                        {
                            frag === 4 && <CompanyUsers/>
                        }
                        {
                            frag === 5 && <Clients/>
                        }
                    </div>
                </Container>
            </main>
        </div>
    );

}

export default withRouter(withStyles(styles)(MyHouse))
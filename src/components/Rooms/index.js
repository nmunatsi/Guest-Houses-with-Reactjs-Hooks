import React, {useEffect} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import firebase from '../firebase'
import withStyles from '@material-ui/core/styles/withStyles'
import {withRouter} from 'react-router-dom'
import AppDrawer from "../Dashboard/AppDrawer";
import Button from "@material-ui/core/Button";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Menu, MenuItem} from "@material-ui/core";
import Room from "../Models/Room";
import Image from 'react-bootstrap/Image'
import imageHolder from '../Asserts/Images/imageholder.jpg'
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }, paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        '& > *': {
            margin: theme.spacing(1),
        },
        marginBottom: 10,
        height: 440,
    }, fixedHeight: {
        height: 240,
    }, appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
});

function Rooms(props) {
    const {classes} = props
    const [frag, setFrag] = React.useState(1);
    const [rooms, setRooms] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    let newRoom = [];
    let roomColle = [];

    let userId;
    userId = firebase.getCurrentUserId();

    useEffect(() => {
        firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                if (dataVal.houseId === userId) {
                    firebase.db.ref('guesthouses').child("Rooms Details").child("RoomTypes").on('value', (snapshot) => {
                        snapshot.forEach(child => {
                            const roomTypeVal = child.val()
                            if (dataVal.roomType === roomTypeVal.typeName) {
                                let roomObj = new Room(dataVal.roomNo, dataVal.houseId, roomTypeVal.maxPerson,
                                    roomTypeVal.price, dataVal.roomType, dataVal.roomStatus, roomTypeVal.hasSingleUse)
                                newRoom.push({
                                    roomObj
                                })
                            }
                        })

                    })
                }
            })
            console.log(newRoom)
            roomColle = newRoom;
        })
        console.log(roomColle)

        setRooms(roomColle)
    }, [])

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
                            <Button variant="outlined" color="secondary" onClick={handleClick}>
                                Select Room Type
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {rooms.map((val) => (
                                        <MenuItem onClick={handleClose}>{val.roomObj.roomType}</MenuItem>
                                    )
                                )}
                            </Menu>

                        </Grid>
                    </Grid>
                    {rooms.map((val) => (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Card className={classes.paper}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt={val.roomObj.roomNo}
                                                height="140"
                                                image={imageHolder}
                                                title={val.roomObj.roomNo}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {val.roomObj.roomNo}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Room Type: {val.roomObj.roomType}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="secondary">
                                                Manage Room
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        )
                    )}
                </Container>
            </main>
        </div>
    );

}

export default withRouter(withStyles(styles)(Rooms))
import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import firebase from '../../Backend/firebase'
import withStyles from '@material-ui/core/styles/withStyles'
import {useHistory, withRouter} from 'react-router-dom'
import AppDrawer from "../../components/AppDrawer";
import Button from "@material-ui/core/Button";
import {Card, CardActionArea, CardContent, CardMedia, Menu, MenuItem} from "@material-ui/core";
import Room from "../../Model/Room";
import imageHolder from '../../Asserts/Images/imageholder.jpg'
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import "../../components/App/styles.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
        marginBottom: 10,
    }, fixedHeight: {
        height: 240,
    }, appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    card: {
        marginTop: theme.spacing(4),
        marginBottom: 20,
        alignItems: "center",
        width: 300,
        marginRight: 50,
        '&:hover': {},

    }, cardContent: {
        height: '50vh',
    },
});

function Rooms(props) {
    const {classes} = props
    const [rooms, setRooms] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [uniqueRoomTypes, setUniqueRoomTypes] = React.useState([]);
    const [filteredRooms, setFilteredRooms] = React.useState([]);
    let history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAddRoom = (event) => {

    };

    function handleClose(val) {
        if (val !== "all") {
            let someRooms = rooms.filter(room => {
                    return room.roomObj.roomType.includes(val);
                }
            )
            setFilteredRooms(someRooms)
        } else {
            filteredRooms.splice(0,filteredRooms.length)
        }
        setAnchorEl(null);
    };

    var userId;
    userId = firebase.getCurrentUserId();

    useEffect(() => {
        var newRoom = [];
        var roomColle = [];
        firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").child(userId).on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                firebase.db.ref('guesthouses').child("Rooms Details").child("RoomTypes").on('value', (snapshot) => {
                    snapshot.forEach(child => {
                        const roomTypeVal = child.val()
                        let imageUrl
                        if (dataVal.roomType === roomTypeVal.typeName) {
                            firebase.db.ref('guesthouses').child("Rooms Details").child("Rooms").child(userId).child("images").child(dataVal.roomNo)
                                .on('value', (dataSnapshot) => {
                                    imageUrl = dataSnapshot.child("roomImage").val()
                                })
                            let roomObj = new Room(dataVal.roomNo, dataVal.houseId, roomTypeVal.maxPerson,
                                roomTypeVal.price, dataVal.roomType, dataVal.roomStatus, roomTypeVal.hasSingleUse, imageUrl)
                            newRoom.push({
                                roomObj
                            })
                        }
                    })

                })

            })
            roomColle = newRoom;
        })
        if (rooms.length!==roomColle.length) {
            setRooms(roomColle)

            rooms.map((room) => {
                return setUniqueRoomTypes((prevState => [...prevState, room.roomObj.roomType]))
            })
        }
    }, [rooms, userId])

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Please login first')
        props.history.replace('/login')
        return null
    }

    const handleRoomSettings = roomNo => {
        history.push({
            pathname: '/rooms/roomMaintanance',
            state: {roomNo: roomNo},
        });
    }

    const roomTypes = [...new Set(uniqueRoomTypes)]

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppDrawer/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} >
                            <Button
                                variant="outlined"
                                color="secondary"
                                style={
                                    {
                                        'marginRight': 20,
                                    }

                                }
                                onClick={handleClick}>
                                <ExpandMoreIcon/>
                                Select Room Type
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                style={
                                    {
                                        'marginRight': 20,
                                    }
                                }
                                onClick={handleAddRoom}>
                                <AddCircleOutlineIcon/>
                                Room
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => handleClose("all")}>All</MenuItem>
                                {roomTypes.map((val) => (
                                        <MenuItem onClick={() => handleClose(val)}>{val}</MenuItem>
                                    )
                                )}
                            </Menu>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={7}>
                            {filteredRooms.length < 1 && rooms.map((val) => (
                                    <div>
                                        <Grid item xs={12}>
                                            <Card className={classes.card}>
                                                <CardActionArea onClick={() => handleRoomSettings(val.roomObj.roomNo)}>

                                                    {val.roomObj.roomImage !== null && <CardMedia
                                                        component="img"
                                                        alt={val.roomObj.roomNo}
                                                        height="140"
                                                        image={val.roomObj.roomImage}
                                                        title={val.roomObj.roomNo}
                                                        className={classes.cardContent}
                                                    />
                                                    }

                                                    {val.roomObj.roomImage === null && <CardMedia
                                                        component="img"
                                                        alt={val.roomObj.roomNo}
                                                        height="140"
                                                        image={imageHolder}
                                                        title={val.roomObj.roomNo}
                                                        className={classes.cardContent}
                                                    />
                                                    }

                                                    <CardContent>
                                                        <Paper className={classes.paper}>
                                                            <h2>
                                                                {val.roomObj.roomNo}
                                                            </h2>
                                                        </Paper>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </div>
                                )
                            )}
                            {filteredRooms && filteredRooms.map((val) => (
                                    <div>
                                        <Grid item xs={12}>
                                            <Card className={classes.card}>
                                                <CardActionArea onClick={() => handleRoomSettings(val.roomObj.roomNo)}>

                                                    {val.roomObj.roomImage !== null && <CardMedia
                                                        component="img"
                                                        alt={val.roomObj.roomNo}
                                                        height="140"
                                                        image={val.roomObj.roomImage}
                                                        title={val.roomObj.roomNo}
                                                        className={classes.cardContent}
                                                    />
                                                    }

                                                    {val.roomObj.roomImage === null && <CardMedia
                                                        component="img"
                                                        alt={val.roomObj.roomNo}
                                                        height="140"
                                                        image={imageHolder}
                                                        title={val.roomObj.roomNo}
                                                        className={classes.cardContent}
                                                    />
                                                    }

                                                    <CardContent>
                                                        <Paper className={classes.paper}>
                                                            <h2>
                                                                {val.roomObj.roomNo}
                                                            </h2>
                                                        </Paper>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </div>
                                )
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );

}

export default withRouter(withStyles(styles)(Rooms))
